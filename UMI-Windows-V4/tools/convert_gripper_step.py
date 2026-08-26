"""将 UMI 手动夹爪 STEP 装配体转换为浏览器可加载的 GLB。

主装配 STEP 使用外部零件引用，普通的单文件转换会得到空模型。本脚本读取
主装配体中的零件位姿，再加载同目录下的零件 STEP，重建完整装配后导出 GLB。
运行脚本需要 CadQuery，仅用于重新生成模型，不是上位机运行依赖。
"""

from __future__ import annotations

import argparse
from pathlib import Path

import cadquery as cq


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MASTER_STEP = PROJECT_ROOT / "assets" / "cad" / "umi_gripper" / "LQ26-05HGI-01.STEP"
DEFAULT_OUTPUT_GLB = PROJECT_ROOT / "frontend" / "assets" / "models" / "umi-gripper.glb"


# 主装配体中 NAUO 节点与零件文件的对应关系。左右对称零件会重复出现。
PART_BY_OCCURRENCE = {
    "NAUO4": "LQ26-05HGI-01-001.STEP",
    "NAUO5": "LQ26-05HGI-01-002.STEP",
    "NAUO6": "LQ26-05HGI-01-006.STEP",
    "NAUO7": "LQ26-05HGI-01-001.STEP",
    "NAUO8": "LQ26-05HGI-01-002.STEP",
    "NAUO9": "LQ26-05HGI-01-004.STEP",
    "NAUO10": "LQ26-05HGI-01-004.STEP",
    "NAUO11": "LQ26-05HGI-01-005.STEP",
    "NAUO12": "LQ26-05HGI-01-009.STEP",
    "NAUO13": "LQ26-05HGI-01-007.STEP",
    "NAUO14": "LQ26-05HGI-01-011.STEP",
    "NAUO15": "LQ26-05HGI-01-009.STEP",
    "NAUO16": "LQ26-05HGI-01-013.STEP",
    "NAUO17": "LQ26-05HGI-01-011.STEP",
    "NAUO18": "LQ26-05HGI-01-011.STEP",
    "NAUO19": "LQ26-05HGI-01-010.STEP",
    "NAUO20": "LQ26-05HGI-01-010.STEP",
    "NAUO21": "LQ26-05HGI-01-014.STEP",
    "NAUO22": "LQ26-05HGI-01-013.STEP",
    "NAUO23": "LQ26-05HGI-01-014.STEP",
    "NAUO24": "LQ26-05HGI-01-010.STEP",
    "NAUO25": "LQ26-05HGI-01-017.STEP",
    "NAUO26": "LQ26-05HGI-01-012.STEP",
    "NAUO27": "LQ26-05HGI-01-016.STEP",
    "NAUO28": "鱼眼相机.STEP",
}

# 这些外侧零件随夹爪闭合向中间运动。节点名前缀由前端用于建立动画分组。
LEFT_JAW_OCCURRENCES = {"NAUO7", "NAUO8", "NAUO9", "NAUO22", "NAUO23"}
RIGHT_JAW_OCCURRENCES = {"NAUO4", "NAUO5", "NAUO10", "NAUO16", "NAUO21"}


def load_assembly(master_step: Path) -> cq.Assembly:
    # CadQuery 会在零件文件位于主文件同目录时自动解析 AP214 外部引用。
    # 先主动校验依赖，避免导出一个只有节点、没有几何体的空 GLB。
    missing = {
        part_name
        for part_name in PART_BY_OCCURRENCE.values()
        if not (master_step.parent / part_name).exists()
    }
    if missing:
        names = "、".join(sorted(missing))
        raise FileNotFoundError(f"STEP 装配体缺少外部零件: {names}")

    assembly = cq.Assembly.importStep(str(master_step))
    solid_count = sum(
        len(child.obj.Solids())
        for child in assembly.children
        if child.obj is not None
    )
    if solid_count == 0:
        raise RuntimeError("STEP 外部引用未解析，导出的模型将为空")
    return assembly


def main() -> None:
    parser = argparse.ArgumentParser(description="将 UMI 手动夹爪 STEP 装配转换为网页 GLB")
    parser.add_argument(
        "master_step",
        nargs="?",
        type=Path,
        default=DEFAULT_MASTER_STEP,
        help="主装配 STEP，默认使用项目 assets/cad/umi_gripper 中的文件",
    )
    parser.add_argument(
        "output_glb",
        nargs="?",
        type=Path,
        default=DEFAULT_OUTPUT_GLB,
        help="输出 GLB，默认覆盖 frontend/assets/models/umi-gripper.glb",
    )
    args = parser.parse_args()

    args.output_glb.parent.mkdir(parents=True, exist_ok=True)
    assembly = load_assembly(args.master_step.resolve())
    assembly.export(
        str(args.output_glb.resolve()),
        exportType="GLTF",
        tolerance=0.15,
        angularTolerance=0.12,
    )
    print(f"已生成: {args.output_glb.resolve()}")


if __name__ == "__main__":
    main()
