namespace SpriteKind {
    export const trampoline = SpriteKind.create()
    export const ball = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    jumpcount = 0
})
function level1 () {
    tiles.setTilemap(tilemap`level1`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(22, 38))
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (jumpcount < 1) {
        mySprite.vy = -100
        jumpcount += 2
    }
})
function level2 () {
    tiles.setTilemap(tilemap`level2`)
}
statusbars.onZero(StatusBarKind.Health, function (status) {
    game.over(false)
})
sprites.onCreated(SpriteKind.ball, function (sprite) {
    sprite.y = 0
    sprite.x = randint(10, 380)
    sprite.setVelocity(0, 60)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    statusbar.value += -2
    otherSprite.destroy(effects.disintegrate, 1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile28`, function (sprite, location) {
    level2()
})
let fireball: Sprite = null
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
statusbar.value = 10
info.setScore(0)
level1()
forever(function () {
    pause(100)
    fireball = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . 4 4 4 5 5 4 4 4 . . . . 
        . . . 5 5 5 5 4 4 4 4 4 4 . . . 
        . . 4 5 5 5 5 2 2 2 1 1 4 4 . . 
        . . 5 5 5 5 5 2 2 2 1 1 5 4 . . 
        . 4 5 5 5 5 2 2 2 2 2 5 5 4 4 . 
        . 4 5 5 5 2 2 2 4 4 4 4 5 4 4 . 
        . 4 4 5 5 2 2 4 4 4 4 4 4 4 4 . 
        . 4 2 5 5 2 2 4 4 4 4 4 4 4 4 . 
        . . 4 2 5 5 2 4 4 4 4 4 2 4 . . 
        . . 4 2 2 5 2 2 4 4 4 2 4 4 . . 
        . . . 4 2 2 2 2 2 2 2 2 4 . . . 
        . . . . 4 4 2 2 2 2 4 4 . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.ball)
})
forever(function () {
    mySprite.ay = 200
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        jumpcount = 0
    }
})
