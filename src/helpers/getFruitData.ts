import { candyColors } from "../constants";

export const getFruitData = (color: candyColors): {
  imageSrc?: string
  imageAlt?: string
} => {
  switch (color) {
    case candyColors.BLUE:
      return {
        imageSrc: 'img/fruits/002-blueberry.png',
        imageAlt: 'Blueberry icon'
      }
    case candyColors.GREEN:
      return {
        imageSrc: 'img/fruits/010-pear.png',
        imageAlt: 'Pear icon'
      }
    case candyColors.ORANGE:
      return {
        imageSrc: 'img/fruits/004-orange.png',
        imageAlt: 'Orange icon'
      }
    case candyColors.PURPLE:
      return {
        imageSrc: 'img/fruits/003-grape.png',
        imageAlt: 'Grapes icon'
      }
    case candyColors.RED:
      return {
        imageSrc: 'img/fruits/005-apple.png',
        imageAlt: 'Apple icon'
      }
    case candyColors.YELLOW:
      return {
        imageSrc: 'img/fruits/006-banana.png',
        imageAlt: 'Banana icon'
      }
    default:
      return {}
  }
}
