# Joseca Telegram Bot

## Descripción

Joseca Bot es un bot diseñado para interactuar con la API de Telegram, permitiendo a los usuarios realizar diversas acciones a través de comandos.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
tsconfig.json
vitest.config.mts
worker-configuration.d.ts
wrangler.jsonc
src/
	command-handler.ts
	index.ts
	interfaces/
		telegram.d.ts
test/
	env.d.ts
	index.spec.ts
tscconfig.json
```

### Archivos Principales

- **src/index.ts**: Punto de entrada del bot.
- **src/command-handler.ts**: Maneja los comandos enviados al bot.
- **src/interfaces/telegram.d.ts**: Define las interfaces para la interacción con la API de Telegram.
- **test/index.spec.ts**: Contiene las pruebas para el bot.

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

```bash
pnpm install
```

## Uso

Para ejecutar el bot, utiliza el siguiente comando:

```bash
pnpm start
```
