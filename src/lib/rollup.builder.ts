import { RollupBuilderConfig } from '../utils/rollup.builder.config';
import { RollupNodeArgs } from '../utils/rollup.node.args';
import { OutputOptions, rollup, RollupOptions, RollupWatchOptions, watch, WatcherOptions } from 'rollup';
import * as fs from 'fs';
import { clearConsole } from '../utils/rollup.build.helpers';
import ora from 'ora';
import chalk from 'chalk';
import logError from '../utils/rollup.log.error';

export class RollupBuilder {
    private readonly configService: RollupBuilderConfig;

    constructor(applicationPath: string, argv: string[]) {
        this.configService = new RollupBuilderConfig(
            applicationPath,
            new RollupNodeArgs(argv)
        );
    }

    async load(options: RollupOptions) {
        const configObject = this.configService.getConfig(options);
        if (this.configService.nodeArgs.getKeyValueArgs().watch) {
            await this.watch(configObject);
        } else {
            await this.build(configObject);
        }
    }

    private async build(configObject: RollupOptions) {
        await this.configService.getLogger()(
            this.cleanDistFolder(),
            'Clearing Dist Folder'
        );
        // create a bundle
        const bundle = await rollup(configObject);
        // const { output } = await bundle.generate(<OutputOptions>configObject.output);
        // or write the bundle to disk
        await this.configService.getLogger()(
            bundle.write(<OutputOptions>configObject.output),
            'Writing Files to dist folder'
        );
    }

    private async cleanDistFolder() {
        fs.rmdirSync(this.configService.getDist(), { recursive: true });
    }

    private async watch(configObject: RollupWatchOptions) {
        await this.configService.getLogger()(
            this.cleanDistFolder(),
            'Clearing Dist Folder'
        );
        configObject.watch = <WatcherOptions>{
            include: (configObject.input) as string[][0],
            buildDelay: 500,
            clearScreen: true
        };
        const watcher = watch(configObject);
        const spinner = ora().start();
        watcher.on('event', (event) => {
            switch (event.code) {
                case 'START':
                    clearConsole();
                    spinner.start(chalk.bold.cyan('Compiling modules...'));
                    break;
                case 'BUNDLE_START':
                    break;
                case 'BUNDLE_END':
                    break;
                case 'END':
                    spinner.succeed(chalk.bold.green('Compiled successfully'));
                    console.log(`${chalk.dim('Watching for changes')}`);
                    break;
                case 'ERROR':
                    spinner.fail(chalk.bold.red('Failed to compile'));
                    logError(event.error);
                    break;
            }
            console.log(event);
        });
    }
}
