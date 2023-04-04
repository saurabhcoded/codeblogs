# codeblogs blogging web application
### Instruction to start locally for development

[1] Clone the repository from github

[2] Update the Next.config.js for images if using other domains than localhost

[3] Change the environment variable for both client and server as per the /env/example provided

[4] Sign up As a user and make your account as admin from database

[5] Now you can have access to other bloggers and readers


pm2 deploy command for deployment frontend
pm2 start npm --name "codeblogs" -- deploy
