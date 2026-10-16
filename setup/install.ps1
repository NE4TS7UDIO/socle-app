# Installe les fichiers projet de Claude Code (.claude/ et .mcp.json).
# À lancer une fois depuis le dossier du projet :
#   powershell -ExecutionPolicy Bypass -File setup\install.ps1
$root = Split-Path -Parent $PSScriptRoot
New-Item -ItemType Directory -Force "$root\.claude\commands" | Out-Null
Copy-Item "$PSScriptRoot\claude\settings.json" "$root\.claude\settings.json" -Force
Copy-Item "$PSScriptRoot\claude\commands\*.md" "$root\.claude\commands\" -Force
Copy-Item "$PSScriptRoot\mcp.json" "$root\.mcp.json" -Force
Write-Host "OK : .claude\ et .mcp.json installés. Lance maintenant : claude"
