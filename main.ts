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
let statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(mySprite)
statusbar.value = 0
level1()
forever(function () {
    mySprite.ay = 200
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        jumpcount = 0
    }
})
