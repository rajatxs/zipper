import { stat, readdir } from 'fs';

/**
 * Checks whether the `path` points to a directory or a file 
 * @param {string} path 
 * @returns {Promise<boolean>}
 */
export function isDir(path) {
   return new Promise(function(resolve, reject) {
      stat(path, function(err, stats) {
         if (err) {
            reject(err);
         } else {
            resolve(stats.isDirectory());
         }
      });
   });
}

/**
 * Returns list of files or directories at target location
 * @param {string} path 
 * @param {string[]} exclude 
 * @returns {Promise<string[]>}
 */
export function getDirs(path, exclude = []) {
   return new Promise(function(resolve, reject) {
      readdir(path, function(err, files) {
         if (err) {
            reject(err);
         } else {
            resolve(files.filter(file => !exclude.includes(file)));
         }
      });
   });
}
