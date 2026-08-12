<#
Starts both the Flask backend and the Next.js frontend for local development.

Usage (from the repo root, in PowerShell):
    .\dev.ps1

Each server opens in its own PowerShell window so you can see its logs and Ctrl+C it
independently. On first run it will create the backend's venv, install both sets of
dependencies, and copy .env.example -> .env / .env.local.example -> .env.local if
those don't exist yet (remember to fill in your real API keys in python-backend\.env).

Use -SkipInstall to skip the venv/npm install checks (faster once already set up).
#>

param(
    [switch]$SkipInstall
)

$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$backendDir = Join-Path $root "python-backend"
$frontendDir = Join-Path $root "frontend-app"
$venvPython = Join-Path $backendDir "venv\Scripts\python.exe"

# --- Backend setup ---
if (-not (Test-Path $venvPython)) {
    Write-Host "Creating Python virtual environment for the backend..." -ForegroundColor Cyan
    python -m venv (Join-Path $backendDir "venv")
}

if (-not $SkipInstall) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
    & $venvPython -m pip install --quiet --disable-pip-version-check -r (Join-Path $backendDir "requirements.txt")
}

$backendEnv = Join-Path $backendDir ".env"
if (-not (Test-Path $backendEnv)) {
    Copy-Item (Join-Path $backendDir ".env.example") $backendEnv
    Write-Host "Created python-backend\.env from .env.example -- add your OPENAI_API_KEY / PINECONE_API_KEY before chatting." -ForegroundColor Yellow
}

# --- Frontend setup ---
if (-not $SkipInstall -and -not (Test-Path (Join-Path $frontendDir "node_modules"))) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
    Push-Location $frontendDir
    npm install
    Pop-Location
}

$frontendEnv = Join-Path $frontendDir ".env.local"
if (-not (Test-Path $frontendEnv)) {
    Copy-Item (Join-Path $frontendDir ".env.local.example") $frontendEnv
    Write-Host "Created frontend-app\.env.local from .env.local.example." -ForegroundColor Yellow
}

# --- Launch both, each in its own window ---
Write-Host "`nStarting backend (Flask) on http://localhost:5000 ..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList @(
    "-NoExit", "-Command",
    "Set-Location `"$backendDir`"; & `"$venvPython`" run.py"
)

Write-Host "Starting frontend (Next.js) on http://localhost:3000 ..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList @(
    "-NoExit", "-Command",
    "Set-Location `"$frontendDir`"; npm run dev"
)

Write-Host "`nBoth servers are launching in their own windows. Close a window (or Ctrl+C inside it) to stop that server." -ForegroundColor Cyan
