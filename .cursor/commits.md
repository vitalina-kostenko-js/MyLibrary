┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   DEVELOP   │───▶│   STAGING   │───▶│    MAIN     │
│ (features)  │    │ (testing)   │    │ (production)│
└─────────────┘    └─────────────┘    └─────────────┘
       ▲                  ▲                  │
       │                  │                  │
       │                  │                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   FEATURE   │    │   HOTFIX    │    │   HOTFIX    │
│  BRANCHES   │    │  BRANCHES   │    │  BRANCHES   │
└─────────────┘    └─────────────┘    └─────────────┘

[action]:[short description of what was done]

[element/file/section]:[brief description of all changes]

* **feat**: When adding new features, files, or components
* **fix**: When fixing bugs or issues
* **docs**: When updating documentation
* **style**: When formatting code, adding semicolons, etc (no production code change)
* **refactor**: When refactoring production code, renaming variables, etc
* **test**: When adding or modifying tests
* **chore**: When updating build tasks, package manager configs, etc
* **perf**: When improving performance
* **ci**: When changing CI/CD configuration files and scripts
* **build**: When changing build system or external dependencies
* **revert**: When reverting a previous commit
