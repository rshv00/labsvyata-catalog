# CI/CD: GitHub -> Azure Function App

This project is configured to auto-deploy to Azure when code is pushed to `main`.

Workflow file:
- `.github/workflows/deploy-azure-function.yml`

## One-time setup (Azure owner only)

1. Open Azure Portal and download publish profile for the target Function App.
2. In GitHub repository, open `Settings -> Secrets and variables -> Actions`.
3. Add repository secret:
   - `AZURE_FUNCTIONAPP_PUBLISH_PROFILE` = full XML content from downloaded publish profile file.
4. Add repository variable:
   - `AZURE_FUNCTIONAPP_NAME` = exact Azure Function App name.

After this setup, collaborators do not need Azure access.

## Collaborator flow

1. Clone repo and make changes.
2. Push to GitHub (directly to `main` or via PR merge into `main`).
3. Deployment starts automatically on every push to `main`.

## Track deployment with GitHub CLI

Install GitHub CLI and log in:

```powershell
winget install --id GitHub.cli -e --source winget
gh auth login
```

Check latest runs:

```powershell
gh run list --workflow "Deploy catalog to Azure Function App" --limit 5
```

Watch the latest run until finish:

```powershell
gh run watch --exit-status
```

Show logs for one run:

```powershell
gh run view <run-id> --log-failed
```
