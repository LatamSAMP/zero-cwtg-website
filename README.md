<h1 align="center">Zero Website</h1>
<p align="center"> A ready-to-deploy website designed for the <b>Zero CW/TG</b>.
</p> <p align="center"> Fully responsive, lightweight, and easily configurable. </p>
<div align="center"> <img width="1683" height="941" alt="image" src="https://github.com/user-attachments/assets/9add6a75-4fe2-4d26-b910-cc2be779f625" /></div>

> [!IMPORTANT]  
> This website requires a [**Zero CWTG SA-MP server**](https://github.com/LatamSAMP/zero-cwtg) running with a **remote MySQL database**.


## Features

- **Player Rankings**: Display top players by Solo (1v1), Duo (2v2), and Team (3v3) modes
- **Match History**: Show recent matches with detailed player statistics
- **Customizable**: Configure server branding with custom colors and team tags

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLatamSAMP%2Fzero-cwtg-website&env=TEAM_TAG,MAIN_COLOR,SERVER_IP,DISCORD_LINK,SERVER_NAME,DB_HOST,DB_PORT,DB_USER,DB_PASSWORD,DB_NAME&envDescription=Configure%20your%20server%20settings%20and%20database%20credentials&envLink=https%3A%2F%2Fgithub.com%2FLatamSAMP%2Fzero-cwtg-website%23environment-variables&project-name=zero-cw-website&repository-name=zero-cw-website)

### Environment Variables

After clicking the deploy button, you'll need to configure the following environment variables:

#### Server Configuration
```bash
TEAM_TAG=TAG                                    # Your team/clan tag
MAIN_COLOR=F8SJ34                               # Primary color (hex without #)
SERVER_IP=cwtg.xyz                              # Your SA-MP server IP:Port
DISCORD_LINK=https://discord.gg/toxicwarriors   # Your Discord invite link
SERVER_NAME=Your Server Name                    # Your server name
```

#### Database Credentials
```bash
DB_HOST=127.0.0.1      # Database host (use your cloud DB host for production)
DB_PORT=3306           # Database port (default MySQL: 3306)
DB_USER=root           # Database username
DB_PASSWORD=password   # Database password
DB_NAME=zero           # Database name
```

## Credits
Developed for the CW/TG community by [LatamSAMP](https://github.com/LatamSAMP)
