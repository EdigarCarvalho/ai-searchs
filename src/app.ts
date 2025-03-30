import { setupEventHandlers } from './ui/eventHandlers';

document.addEventListener('DOMContentLoaded', async () => {
    await setupEventHandlers();
    
    console.log('App initialized');
});