@echo off
REM ============================================
REM Script para crear estructura limpia
REM Electron + Node.js
REM ============================================

setlocal enabledelayedexpansion

echo Creando estructura de carpetas...

REM Crear carpetas principales
mkdir src
mkdir tests
mkdir config
mkdir scripts

REM Domain Layer
mkdir src\domain
mkdir src\domain\entities
mkdir src\domain\repositories
mkdir src\domain\usecases

REM Application Layer
mkdir src\application
mkdir src\application\dto
mkdir src\application\mappers
mkdir src\application\services

REM Infrastructure Layer
mkdir src\infrastructure
mkdir src\infrastructure\database
mkdir src\infrastructure\repositories
mkdir src\infrastructure\external-services
mkdir src\infrastructure\config

REM Presentation Layer
mkdir src\presentation
mkdir src\presentation\electron
mkdir src\presentation\electron\ipc-handlers
mkdir src\presentation\ui
mkdir src\presentation\ui\components
mkdir src\presentation\ui\pages
mkdir src\presentation\ui\styles
mkdir src\presentation\ui\assets
mkdir src\presentation\controllers

REM Shared Layer
mkdir src\shared
mkdir src\shared\constants
mkdir src\shared\utils
mkdir src\shared\helpers
mkdir src\shared\errors
mkdir src\shared\types

REM Tests
mkdir tests\unit
mkdir tests\integration
mkdir tests\e2e

echo.
echo ✓ Estructura creada exitosamente
echo.
pause