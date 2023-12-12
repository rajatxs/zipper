#!/usr/bin/env node
import { basename } from 'path';
import { program } from 'commander';
import AdmZip from 'adm-zip';
import { isDir, getDirs } from './utils.js';

program
   .version('1.0.0', '-v, --version')
   .description('Simple file archive utility')
   .option('-e, --exclude [char...]', "exclude files or directories")
   .option('-o, --outfile <char>', "give output filename");

program.action(async function(args) {
   const zip = new AdmZip();

   const cwd = process.cwd();
   const baseDirName = basename(cwd);
   const timestamp = Date.now();

   const exclude = args.exclude || [];
   const outfile = args.outfile || `${baseDirName}_${timestamp.toString()}.zip`;

   /** @type {string[]} */
   let files;

   try {
      files = await getDirs(cwd, exclude);
   } catch (error) {
      console.error("Error:", "failed to read current directory");
      process.exit(1);
   }

   for (const file of files) {
      /** @type {boolean} */
      let _dir;

      try {
         _dir = await isDir(file);
      } catch (error) {
         console.error("Error:", `failed to get info at ${file}`);
         process.exit(1);
      }

      try {
         if (_dir) {
            zip.addLocalFolder(file, file);
         } else {
            zip.addLocalFile(file);
         }
      } catch (error) {
         console.error("Error:", "failed to write file content");
         process.exit(1);
      }
   }

   try {
      await zip.writeZipPromise(outfile, {
         overwrite: true,
      });
      console.log("File saved:", outfile);
   } catch (error) {
      console.error("Error:", "failed to save output file");
      process.exit(1);
   }
});

program.parse();
