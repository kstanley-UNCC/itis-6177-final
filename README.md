# ITIS-6177 Final Project: Azure Language Service API

---
#### Author: Ken Stanley <ken.stanley@uncc.edu>

---
## Table of Contents
1. [Installation](#installation)
2. [Setup/Configuration](#setupconfiguration)
3. [Usage](#usage)
4. [API Reference](#api-reference)

---
### Installation
1. Install NodeJS:<br>
`brew install node`

2. Install Yarn:<br>
`brew install yarn`

3. Clone repository:<br>
```shell
$ git clone https://github.com/kstanley-UNCC/itis-6177-final.git
$ cd itis-6177-final
```
4. Install dependencies:<br>
`yarn install`

### Setup/Configuration
1. Sign into [Microsoft Azure](https://azure.microsoft.com/)
2. Create a new [language resource](https://aka.ms/createLanguageResource)
3. On the dashboard, click on *Click here to manage keys*
4. Copy `Key 1` to your clipboard
5. For Bash users, open `~/.bashrc`, for ZSH users, open `~/.zshrc`, in either VIM or Nano
6. Add `export AZURE_LANGUAGE_SUBSCRIPTION_KEY=<key>`, where `<key>` is the value of Key 1 in your clipboard
7. Save and quit using `:wq` in VIM, `Ctl-O` and `Ctl-X` in Nano
8. Enter `source ~/.bashrc` for Bash, or `source ~/.zshrc` for ZSH
9. Run the application using `yarn start`

### Usage

### API Reference
