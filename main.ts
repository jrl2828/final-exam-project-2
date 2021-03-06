namespace SpriteKind {
    export const trampoline = SpriteKind.create()
    export const ball = SpriteKind.create()
    export const heart = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    jumpcount = 0
})
function level1 () {
    scene.setBackgroundColor(6)
    tiles.setTilemap(tilemap`level1`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(22, 38))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.heart, function (sprite, otherSprite) {
    statusbar.value += 5
    otherSprite.destroy()
    music.baDing.play()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    level2()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jumpcount < 1) {
        mySprite.vy = -100
        jumpcount += 2
    }
})
function level2 () {
    scene.setBackgroundColor(15)
    tiles.setTilemap(tilemap`level2`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 13))
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.over(false)
})
sprites.onCreated(SpriteKind.ball, function (sprite) {
    sprite.y = 495
    sprite.x = randint(135, 400)
    sprite.setVelocity(0, 90)
})
scene.onHitWall(SpriteKind.ball, function (sprite, location) {
    sprite.destroy(effects.disintegrate, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    statusbar.value += -10
    otherSprite.destroy(effects.fire, 500)
})
let fireball: Sprite = null
let heartHealth: Sprite = null
let statusbar: StatusBarSprite = null
let jumpcount = 0
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 5 5 5 5 5 . . . . . . 
    . . . . . 5 5 5 5 5 . . . . . . 
    . . . . . 5 f 5 f 5 . . . . . . 
    . . . . . 5 5 5 5 5 . . . . . . 
    . . . . . 5 5 5 5 5 . . . . . . 
    . . . . . 5 5 5 5 5 . . . . . . 
    . . . . . 5 5 5 5 5 . . . . . . 
    . . . . . 5 . . . 5 . . . . . . 
    . . . . . 4 . . . 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
scene.cameraFollowSprite(mySprite)
jumpcount = 0
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(mySprite)
statusbar.value = 100
info.setScore(0)
level1()
game.setDialogFrame(img`
    ...cc..............................cc.....
    ..c55c..bbbb...bbbbb...bbbbb......c55c....
    .cb55bcbdddbbbbbdddbbbbbdddbbbbbbcb55bc...
    b555555bbdddb111bdddb111bdddb11db555555b..
    bb5555bbbbdb11111bdb11111bdb1111bb5555bb..
    cb5555bcddd11111ddd11111ddd11111cb5555bc..
    .c5bb5c1111d111d111d111d111d111ddc5bb5c...
    .cbbbbc11111111111111111111111111cbbbbc...
    ..b1111111111111111111111111111111dddbb...
    ..b11111111111111111111111111111111dbbdb..
    ..bb1111111111111111111111111111111dbddb..
    .bbdb1d1111111111111111111111111111ddddb..
    .bdddd1111111111111111111111111111d1bdbb..
    .bddbd1111111111111111111111111111111bb...
    .bdb1d11111111111111111111111111111111b...
    .bb111d1111111111111111111111111111111b...
    ..b1111111111111111111111111111111d111bb..
    ..b11111111111111111111111111111111d1bdb..
    ..bb1111111111111111111111111111111dbddb..
    .bbdb1d1111111111111111111111111111ddddb..
    .bdddd1111111111111111111111111111d1bdbb..
    .bddbd1111111111111111111111111111111bb...
    .bdb1d11111111111111111111111111111111b...
    .bb111d1111111111111111111111111111111b...
    ..b1111111111111111111111111111111d111bb..
    ..b11111111111111111111111111111111d1bdb..
    ..bb1111111111111111111111111111111dbddb..
    .bbdb1d1111111111111111111111111111ddddb..
    .bdddd1111111111111111111111111111d1bdbb..
    .bddbd1111111111111111111111111111111bb...
    .bdbb111111111111111111111111111111111b...
    .bbbd111111111111111111111111111111111b...
    ..bcc11111111111111111111111111111dccdb...
    ..c55c1111111d111d111d111d111d1111c55cb...
    .cb55bcdd11111ddd11111ddd11111dddcb55bc...
    b555555bd1111bdb11111bdb11111bdbb555555b..
    bb5555bbdd11bdddb111bdddb111bdddbb5555bb..
    cb5555bcbbbbbbdddbbbbbdddbbbbbddcb5555bc..
    .c5bb5c......bbbbb...bbbbb...bbbbc5bb5c...
    .cbbbbc..........................cbbbbc...
    ..........................................
    ..........................................
    `)
game.showLongText("", DialogLayout.Center)
for (let value of tiles.getTilesByType(assets.tile`myTile32`)) {
    heartHealth = sprites.create(img`
        .....................
        .....................
        .....................
        .....................
        .....................
        .....................
        ......b33...33.......
        .....b3333b3333......
        .....b333333313......
        .....b333333133......
        .....bb3333333b......
        ......bb33333b.......
        .......bb333b........
        ........bb3b.........
        .........bb..........
        .....................
        .....................
        .....................
        .....................
        .....................
        `, SpriteKind.heart)
    animation.runImageAnimation(
    heartHealth,
    [img`
        .....................
        .....................
        .....................
        .....................
        .....................
        .....................
        .....................
        .....................
        ......b33...33.......
        .....b3333b3333......
        .....b333333313......
        .....b333333133......
        .....bb3333333b......
        ......bb33333b.......
        .......bb333b........
        ........bb3b.........
        .........bb..........
        .....................
        .....................
        .....................
        `,img`
        .....................
        .....................
        .....................
        .....................
        .....................
        .....................
        ......b33...33.......
        .....b3333b3333......
        .....b333333313......
        .....b333333133......
        .....bb3333333b......
        ......bb33333b.......
        .......bb333b........
        ........bb3b.........
        .........bb..........
        .....................
        .....................
        .....................
        .....................
        .....................
        `],
    500,
    true
    )
    tiles.placeOnTile(heartHealth, value)
    tiles.setTileAt(value, assets.tile`transparency16`)
}
game.onUpdate(function () {
    pause(1000)
    fireball = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 4 . . . . . 
        . . . . 2 . . . . 4 4 . . . . . 
        . . . . 2 4 . . 4 5 4 . . . . . 
        . . . . . 2 4 d 5 5 4 . . . . . 
        . . . . . 2 5 5 5 5 4 . . . . . 
        . . . . . . 2 5 5 5 5 4 . . . . 
        . . . . . . 2 5 4 2 4 4 . . . . 
        . . . . . . 4 4 . . 2 4 4 . . . 
        . . . . . 4 4 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.ball)
})
forever(function () {
    mySprite.ay = 200
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        jumpcount = 0
    }
})
