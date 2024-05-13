/*
 * bit:Car for micro:bit customblocks
 *
 * Copyright © 2024 FAP. All rights reserved.
 *
 * 2024.05.13  (FAP)m-asaoka  新規作成
 *
 */

/**
 *  命令
 */
enum CustomCommand {
    //% block="ていし（停止）"
    Stop = 0,
    //% block="かいてん（回転）"
    Rotate = 1,
    //% block="まえにすすむ（前進）"
    Forward = 3,
    //% block="うしろにすすむ（更新）"
    Back = 4
}
/**
 *  前進／後進
 */
enum CustomAction{
    //% block="まえにすすむ（前進）"
    Forward = 0,
    //% block="うしろにすすむ（後進）"
    Back = 1
}
/**
 *  左右進行方向
 */
enum CustomDistination {
    //% block="右（みぎ）"
    Right = 0,
    //% block="左（ひだり）"
    Left = 1
}
/**
 *  カスタムブロック
 */
//% weight=0 color=#F22E1F icon="\uf076" block="ビットカー"
namespace custom {
    let nowStatus = CustomCommand.Stop;
    let p14_forward = 545;          // 前進するためのP14回転数
    let p16_forward = 1000;         // 前進するためのP16回転数
    let forwardStop = 1000;  // 前進して停止するまでの時間(msec)
    let p14_back = 400;      // 後退するためのP14回転数
    let p16_back = 1000;     // 後退するためのP16回転数
    let backStop = 1000;     // 後退して停止するまでの時間(msec)

    /**
    * ビットカーを停止
    */
    export function Stop() : void {
        WriteAnalogPin(AnalogPin.P14, 0);
        WriteAnalogPin(AnalogPin.P16, 0);
    }
    /**
    * ビットカーを前進
    */
    //% block="↑(まっすぐすすむ）"
    //% group="レベル1"
    export function Forward(): void {
        basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
        //前進
        WriteDigtalPin(DigitalPin.P13, 0);
        WriteDigtalPin(DigitalPin.P15, 0);
        WriteAnalogPin(AnalogPin.P14, p14_forward);
        WriteAnalogPin(AnalogPin.P16, p16_forward);
        basic.pause(forwardStop);
        Stop();
    }
    /**
    * ビットカーを後進
    */
    //% block="↓(うしろにすすむ）"
    //% group="レベル1"
    export function Back(): void {
        basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
        WriteDigtalPin(DigitalPin.P13, 1);
        WriteDigtalPin(DigitalPin.P15, 1);
        WriteAnalogPin(AnalogPin.P14, p14_back);
        WriteAnalogPin(AnalogPin.P16, p16_back);
        basic.pause(backStop);
        Stop();
    }
    /**
    * ビットカーを左回転（９０度）
    */
    //% block="↶（ひだりにかいてん）"
    //% group="レベル1"
    export function LeftRotation() : void {
        Rotation(CustomDistination.Left);
    }
    /**
    * ビットカーを右回転（９０度）
    */
    //% block="↷（みぎにかいてん）"
    //% group="レベル1"
    export function RightRotation() : void {
        Rotation(CustomDistination.Right);
    }
    /**
    * ビットカーを９０度回転させる（内部関数）
    */
    export function Rotation(value: CustomDistination) : void {
        switch (value) {
            case CustomDistination.Left: //　左90度回転
                basic.showLeds(`
                . # # # #
                . # . . .
                . # . # .
                # # # . .
                . # . . .
                `)
                WriteDigtalPin(DigitalPin.P15, 0);
                WriteAnalogPin(AnalogPin.P16, 1023);
                basic.pause(650);
                WriteAnalogPin(AnalogPin.P16, 0);
                break;
            case CustomDistination.Right: // 右90度回転
                basic.showLeds(`
                # # # # .
                . . . # .
                . # . # .
                . . # # #
                . . . # .
                `)
                WriteDigtalPin(DigitalPin.P13, 0);
                WriteAnalogPin(AnalogPin.P14, 1023);
                basic.pause(650);
                WriteAnalogPin(AnalogPin.P14, 0);
                break;
            default:
                break;
        }
    }
    export function WriteDigtalPin(value: DigitalPin, value2: number) : void {
        pins.digitalWritePin(value, value2);
    }
    export function WriteAnalogPin(value: AnalogPin, value2: number) :void {
        pins.analogWritePin(value, value2);
    }
}
