import { Graph } from './models/Graph';
import { Node } from './models/Node';
import { setupEventHandlers } from './ui/eventHandlers';

document.addEventListener('DOMContentLoaded', async () => {
    await setupEventHandlers();
    
    console.log('App initialized');
});