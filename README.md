# g4e-tutorial
https://docs.glue42.com/g4e/tutorial/index.html

# Glue Desktop (GD) Setup

- Clone https://github.com/Tick42/glue-desktop
- Checkout the latest prod branch (ask anyone what the latest prod branch is)
- Launch Glue Desktop from glue-desktop/GlueDesktop/StartNoProfile.cmd
- Chose the User Applications you want to start and click ok

# Glue Serch Service (GSS) Setup

- Copy support/gd-support-files/providers.properties
- Paste it (*overwrite* the existing file) inside glue-desktop/GlueDesktop/GSS/tick42-gds-server/configuration
- Restart Glue Desktop

# Glue4Office Excel Setup

- Stop Glue Desktop
- Navigate to glue-desktop/GlueDesktop/CommonConfig/tick42-training
- Double-click GlueInstaller.cmd
- Double-click UpdateCommon.cmd
- Start Glue Desktop
- Launch Excel
- Go to options -> trust center -> trusted locations
- Add the Glue Desktop's location
- Navigate to glue-desktop/GlueDesktop/GlueXL
- Double-click GlueXL.xll
- You should see two green check marks
