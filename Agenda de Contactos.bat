@echo off
title Agenda de Contactos
echo.
echo ===========================================
echo    AGENDA DE CONTACTOS - A iniciar...
echo ===========================================
echo.

cd /d "%~dp0"

start "Servidor Agenda" /min "C:\Program Files\nodejs\node.exe" server.js

timeout /t 2 /nobreak >nul

start "" "http://localhost:8080/login.html"

echo.
echo Servidor iniciado. Pode fechar esta janela.
pause
