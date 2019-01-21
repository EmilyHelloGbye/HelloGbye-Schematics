import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';
//There are four methods that directly create a change
//in a Tree; create, delete, rename, and overwrite.

const licenseText = `
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
`;

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function myComponent(options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component',options),
    (tree: Tree, _context: SchematicContext) => {
    tree.getDir(options.sourceDir)
    .visit(filePath => {
      if (!filePath.endsWith('.ts')){
        return;
      }
      const content = tree.read(filePath);
      if (!content){
        return;
      }

      //Prevent from writing license to files that already have one
      if (content.indexOf(licenseText)==-1){
        tree.overwrite(filePath, licenseText + content);
      }
    });
    return tree;
  },
]);
}
