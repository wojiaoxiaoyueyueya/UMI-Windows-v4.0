# UMI 手动夹爪 CAD 源文件

此目录保存空间位姿页面所使用的手动夹爪原始 STEP 装配。

- `LQ26-05HGI-01.STEP` 是总装文件。
- `LQ26-05HGI-01-001.STEP` 至 `LQ26-05HGI-01-017.STEP` 是总装引用的零件，不能只保留总装文件。
- `鱼眼相机.STEP` 是相机零件源文件。
- 网页运行时加载的是 `frontend/assets/models/umi-gripper.glb`，普通用户不需要安装 CAD 软件或 CadQuery。

需要重新生成网页模型时，在项目根目录执行：

```powershell
python tools/convert_gripper_step.py
```

转换脚本依赖 CadQuery。夹爪闭合动画通过移动 GLB 中两组夹指装配节点实现，是面向状态展示的近似动画，不用于机械干涉或运动学计算。
