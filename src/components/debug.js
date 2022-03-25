import Stats from 'three/examples/jsm/libs/stats.module';
import RendererStats from '@xailabs/three-renderer-stats'

let stats,rendererStats;
//Stats and Debug, no need to include in final version
if (process.env.NODE_ENV === 'development') {
    stats = Stats()
    rendererStats = new RendererStats();
    rendererStats.domElement.style.position = 'absolute'
    rendererStats.domElement.style.left = '0px'
    rendererStats.domElement.style.bottom = '0px'
    document.body.appendChild(rendererStats.domElement)
    document.body.appendChild(stats.dom)
}


export {stats,rendererStats}