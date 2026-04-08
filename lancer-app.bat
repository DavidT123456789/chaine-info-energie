@echo off
title Chaines Info Energie

echo ============================================
echo   Chaines d'Information et d'Energie
echo   Demarrage de l'application...
echo ============================================
echo.

if not exist "node_modules" (
    echo [1/2] Installation des dependances...
    echo       Cela peut prendre quelques minutes.
    echo.
    call pnpm install
    if errorlevel 1 (
        echo.
        echo [ERREUR] pnpm non trouve, essai avec npm...
        call npm install
        if errorlevel 1 (
            echo.
            echo [ERREUR] Installation echouee.
            echo Installez Node.js : https://nodejs.org
            pause
            exit /b 1
        )
    )
    echo.
    echo [OK] Dependances installees.
    echo.
) else (
    echo [OK] Dependances deja installees.
    echo.
)

echo [2/2] Lancement du serveur...
echo.
echo ============================================
echo   Ouvrez votre navigateur sur :
echo   http://localhost:3000
echo ============================================
echo.
echo   Ctrl+C pour arreter le serveur.
echo.

start "" cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:3000"

call pnpm dev
if errorlevel 1 (
    call npm run dev
)

pause
