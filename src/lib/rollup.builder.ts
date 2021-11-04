import { RollupBuilderConfig } from '../utils/rollup.builder.config';
import { NodeArgs } from '../utils/node.args';
import { OutputOptions, rollup, RollupOptions } from 'rollup';
import * as fs from 'fs';

export class RollupBuilder {
  private readonly configService: RollupBuilderConfig;

  constructor(applicationPath: string, argv: string[]) {
    this.configService = new RollupBuilderConfig(
      applicationPath,
      new NodeArgs(argv)
    );
  }

  async load(options: RollupOptions) {
    const configObject = this.configService.getConfig(options);
    await this.build(configObject);
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
}
