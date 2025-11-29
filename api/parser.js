const fs = require('fs');
const path = require('path');
const console = require('console');

const parser = {
  parse: function (filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const lines = data.split('\n');
      const terraformBlocks = [];

      let currentBlock = {
        type: '',
        attributes: {},
        children: []
      };

      for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine === '' || trimmedLine.startsWith('#')) {
          continue;
        }

        if (trimmedLine.startsWith('resource') || trimmedLine.startsWith('provider')) {
          currentBlock.type = trimmedLine.split(' ')[0];
          currentBlock.attributes = {};
        }

        const match = trimmedLine.match(/([a-zA-Z0-9_]+)=([a-zA-Z0-9_]+)/);

        if (match) {
          const key = match[1];
          const value = match[2];

          currentBlock.attributes[key] = value;
        }

        if (trimmedLine.startsWith('}')) {
          terraformBlocks.push(currentBlock);
          currentBlock = {
            type: '',
            attributes: {},
            children: []
          };
        }
      }

      return terraformBlocks;
    } catch (error) {
      console.error(`Error parsing file: ${error}`);
      return null;
    }
  }
};

module.exports = parser;