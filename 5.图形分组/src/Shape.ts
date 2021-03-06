import { IShapeConfig } from './interfaces/IShapeConfig';
import { Node } from './Node';
import { Util, shapes } from './Util';
export class Shape<Config extends IShapeConfig = IShapeConfig> extends Node<Config> {
    colorKey: string
    constructor(config?: Config) {
        super(config)
        let key = Util.getColorKey()
        this.colorKey = key
        shapes[key] = this
    }

    drawScene(): void {
        var layer = this.getLayer(),
            context = layer.getContext(),
            drawFunc = this.getSceneFunc();

        context.save()
        let at = this.getAbsoluteTransform().getMatrix()
        context.transform(at[0], at[1], at[2], at[3], at[4], at[5])
        drawFunc.call(this, context)
        context.restore()
    }

    drawHit(): void {
        var layer = this.getLayer(),
            context = layer.getHitContext(),
            drawFunc = this.getHitFunc() || this.getSceneFunc();
        context.save()
        let at = this.getAbsoluteTransform().getMatrix()
        context.transform(at[0], at[1], at[2], at[3], at[4], at[5])
        drawFunc.call(this, context)
        context.restore()
    }

    getSceneFunc() {
        return this['_sceneFunc'];
    }

    getHitFunc() {
        return this['_sceneHit'];
    }
}