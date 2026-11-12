@echo off
chcp 65001 > nul
title ReVeste - Back-end Java Spring Boot
echo ========================================================
echo   🌿 Iniciando o Back-end Java Spring Boot - ReVeste
echo   FATEC Itapetininga - Programação Orientada a Objetos
echo ========================================================
echo.

where mvn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Maven detectado no sistema. Iniciando aplicacao...
    call mvn clean spring-boot:run
    goto fim
)

if exist "mvnw.cmd" (
    echo [INFO] Executando atraves do Maven Wrapper...
    call mvnw.cmd clean spring-boot:run
    goto fim
)

echo [AVISO] O comando 'mvn' nao foi encontrado no seu PATH.
echo Por favor, certifique-se de ter o JDK 17+ e o Maven instalados.
echo Voce tambem pode abrir esta pasta no VS Code, IntelliJ IDEA ou Eclipse e executar RevesteApiApplication.java diretamente.
echo.
pause

:fim
