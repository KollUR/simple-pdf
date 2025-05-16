/// <reference lib="webworker" />
import {
    ApplicationBehaviors,
    ApplicationNode, OptionalPromise,
    registerApplicationBehavior,
    ScriptBuilder
} from '@universal-robots/contribution-api';
import { DocumentViewNode } from './document-view.node';

// factory is required
const createApplicationNode = (): OptionalPromise<DocumentViewNode> => ({
    type: 'sko-inc-simple-pdf-document-view',    // type is required
    version: '1.0.0'     // version is required
});

// generatePreamble is optional
const generatePreambleScriptCode = (node: DocumentViewNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    return builder;
};

// upgradeNode is optional
const upgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: DocumentViewNode): DocumentViewNode =>
      defaultNode;

// downgradeNode is optional
const downgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: DocumentViewNode): DocumentViewNode =>
      defaultNode;

const behaviors: ApplicationBehaviors = {
    factory: createApplicationNode,
    generatePreamble: generatePreambleScriptCode,
    upgradeNode: upgradeApplicationNode,
    downgradeNode: downgradeApplicationNode
};

registerApplicationBehavior(behaviors);
