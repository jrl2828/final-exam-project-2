namespace SpriteKind {
    export const trampoline = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    jumpcount = 0
})
function level1 () {
    tiles.setTilemap(tilemap`level1`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(22, 38))
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    game.over(false)
})
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    statusbar.value += -2
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.trail, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
    mySprite.startEffect(effects.hearts, 100)
    music.baDing.play()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile28`, function (sprite, location) {
    level2()
})
let projectile: Sprite = null
let choice = 0
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
game.onUpdateInterval(1000, function () {
    choice = randint(1, 3)
    if (choice == 1) {
        projectile = sprites.createProjectileFromSide(img`
            . . . . . 3 3 b 3 3 d d 3 3 . . 
            . . . . 3 1 1 d 3 d 1 1 1 1 3 . 
            . . . 3 d 1 1 1 d 1 1 1 d 3 1 3 
            . . 3 d d 1 1 1 d d 1 1 1 3 3 3 
            . 3 1 1 d 1 1 1 1 d d 1 1 b . . 
            . 3 1 1 1 d 1 1 1 1 1 d 1 1 3 . 
            . b d 1 1 1 d 1 1 1 1 1 1 1 3 . 
            . 4 b 1 1 1 1 d d 1 1 1 1 d 3 . 
            . 4 4 d 1 1 1 1 1 1 d d d b b . 
            . 4 d b d 1 1 1 1 1 1 1 1 3 . . 
            4 d d 5 b d 1 1 1 1 1 1 1 3 . . 
            4 5 d 5 5 b b d 1 1 1 1 d 3 . . 
            4 5 5 d 5 5 d b b b d d 3 . . . 
            4 5 5 5 d d d d 4 4 b 3 . . . . 
            . 4 5 5 5 4 4 4 . . . . . . . . 
            . . 4 4 4 . . . . . . . . . . . 
            `, -60, 0)
    } else if (choice == 2) {
        projectile = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . 6 6 6 6 6 
            . . . . . . . . . 6 6 7 7 7 7 8 
            . . . . . . 8 8 8 7 7 8 8 6 8 8 
            . . e e e e c 6 6 8 8 . 8 7 8 . 
            . e 2 5 4 2 e c 8 . . . 6 7 8 . 
            e 2 4 2 2 2 2 2 c . . . 6 7 8 . 
            e 2 2 2 2 2 2 2 c . . . 8 6 8 . 
            e 2 e e 2 2 2 2 e e e e c 6 8 . 
            c 2 e e 2 2 2 2 e 2 5 4 2 c 8 . 
            . c 2 e e e 2 e 2 4 2 2 2 2 c . 
            . . c 2 2 2 e e 2 2 2 2 2 2 2 e 
            . . . e c c e c 2 2 2 2 2 2 2 e 
            . . . . . . . c 2 e e 2 2 e 2 c 
            . . . . . . . c e e e e e e 2 c 
            . . . . . . . . c e 2 2 2 2 c . 
            . . . . . . . . . c c c c c . . 
            `, 60, 0)
    } else {
        projectile = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . b 5 5 b . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . b b b b b 5 5 5 5 5 5 5 b . . 
            . b d 5 b 5 5 5 5 5 5 5 5 b . . 
            . . b 5 5 b 5 d 1 f 5 d 4 f . . 
            . . b d 5 5 b 1 f f 5 4 4 c . . 
            b b d b 5 5 5 d f b 4 4 4 4 b . 
            b d d c d 5 5 b 5 4 4 4 4 4 4 b 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `, 55, 0)
        projectile.setKind(SpriteKind.Food)
    }
    projectile.y = randint(10, 110)
})
forever(function () {
    mySprite.ay = 200
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        jumpcount = 0
    }
})
