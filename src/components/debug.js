import Stats from 'three/examples/jsm/libs/stats.module';
import RendererStats from '@xailabs/three-renderer-stats'

//Stats and Debug, no need to include in final version

const stats = Stats()
const rendererStats = new RendererStats();
rendererStats.domElement.style.position = 'absolute'
rendererStats.domElement.style.left = '0px'
rendererStats.domElement.style.bottom = '0px'
document.body.appendChild(rendererStats.domElement)
document.body.appendChild(stats.dom)

export {stats,rendererStats}