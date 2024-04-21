import bodyParser from 'body-parser';
import { Router } from 'express';
import { Chalk } from 'chalk';
import * as officeParser from 'officeparser';

interface PluginInfo {
    id: string;
    name: string;
    description: string;
}

interface Plugin {
    init: (router: Router) => Promise<void>;
    exit: () => Promise<void>;
    info: PluginInfo;
}

const chalk = new Chalk();
const MODULE_NAME = '[SillyTavern-Office-Parser]';

/**
 * Initialize the plugin.
 * @param router Express Router
 */
export async function init(router: Router): Promise<void> {
    const jsonParser = bodyParser.json();
    router.post('/probe', (_req, res) => {
        return res.sendStatus(204);
    });
    router.post('/parse', jsonParser, async (req, res) => {
        try {
            if (!req.body.data) {
                return res.status(400).send('Bad Request');
            }
            const base64Data = String(req.body.data).split(',')[1];
            const data = Buffer.from(base64Data, 'base64');
            const result = await officeParser.parseOfficeAsync(data);
            console.log(chalk.green(MODULE_NAME), `Successfully parsed document`);
            return res.send(result);
        } catch (error) {
            console.error(chalk.red(MODULE_NAME), 'Parsing failed', error);
            return res.status(500).send('Internal Server Error');
        }
    });

    console.log(chalk.green(MODULE_NAME), 'Plugin loaded!');
}

export async function exit(): Promise<void> {
    console.log(chalk.yellow(MODULE_NAME), 'Plugin exited');
}

export const info: PluginInfo = {
    id: 'office',
    name: 'Office Parser',
    description: 'Extract text from Office documents.',
};

const plugin: Plugin = {
    init,
    exit,
    info,
};

export default plugin;
