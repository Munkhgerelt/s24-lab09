import { newMostMistakesFirstSorter } from '../src/ordering/prioritization/mostmistakes.js'
import { newRecentMistakesFirstSorter } from '../src/ordering/prioritization/recentmistakes.js'
import { CardStatus, newCardStatus } from '../src/cards/cardstatus.js'
import { newFlashCard } from '../src/cards/flashcard.js'

const createMostMistakesFirstSorter = newMostMistakesFirstSorter
const createRecentMistakesFirstSorter = newRecentMistakesFirstSorter

describe('Test prioritization', () => {
  const flashCard1 = newFlashCard('Question1', 'Answer1')
  const flashCard2 = newFlashCard('Question2', 'Answer2')
  const flashCard3 = newFlashCard('Question3', 'Answer3')
  const flashCard4 = newFlashCard('Question4', 'Answer4')
  const flashCard5 = newFlashCard('Question5', 'Answer5')
  const flashCard6 = newFlashCard('Question6', 'Answer6')
  const flashCard7 = newFlashCard('Question7', 'Answer7')
  const flashCard8 = newFlashCard('Question8', 'Answer8')
  const cardStatus1 = newCardStatus(flashCard1)
  const cardStatus2 = newCardStatus(flashCard2)
  const cardStatus3 = newCardStatus(flashCard3)
  const cardStatus4 = newCardStatus(flashCard4)
  const cardStatus5 = newCardStatus(flashCard5)
  const cardStatus6 = newCardStatus(flashCard6)
  const cardStatus7 = newCardStatus(flashCard7)
  const cardStatus8 = newCardStatus(flashCard8)
  cardStatus1.recordResult(false)
  cardStatus1.recordResult(false)
  cardStatus1.recordResult(false)
  cardStatus2.recordResult(true)
  cardStatus2.recordResult(true)
  cardStatus2.recordResult(false)
  cardStatus3.recordResult(true)
  cardStatus3.recordResult(false)
  cardStatus3.recordResult(true)
  cardStatus4.recordResult(true)
  cardStatus4.recordResult(false)
  cardStatus4.recordResult(false)
  cardStatus5.recordResult(false)
  cardStatus5.recordResult(true)
  cardStatus5.recordResult(true)
  cardStatus6.recordResult(false)
  cardStatus6.recordResult(true)
  cardStatus6.recordResult(false)
  cardStatus7.recordResult(false)
  cardStatus7.recordResult(false)
  cardStatus7.recordResult(true)
  cardStatus8.recordResult(true)
  cardStatus8.recordResult(true)
  cardStatus8.recordResult(true)
  // Covering all combinations of CardStatus with three recorded results.

  const cards: CardStatus[] = [cardStatus1, cardStatus2, cardStatus3, cardStatus4, cardStatus5, cardStatus6, cardStatus7, cardStatus8]

  test('Test newMostMistakesFirstSorter', () => {
    const cardsSorted: CardStatus[] = createMostMistakesFirstSorter().reorganize(cards)
    expect(cardsSorted[0]).toEqual(cardStatus1)
    expect(cardsSorted[1]).toEqual(cardStatus4)
    expect(cardsSorted[2]).toEqual(cardStatus6)
    expect(cardsSorted[3]).toEqual(cardStatus7)
    expect(cardsSorted[4]).toEqual(cardStatus2)
    expect(cardsSorted[5]).toEqual(cardStatus3)
    expect(cardsSorted[6]).toEqual(cardStatus5)
    expect(cardsSorted[7]).toEqual(cardStatus8)
  })

  test('Test recentRecentMistakesFirstSorter', () => {
    const cardsSorted: CardStatus[] = createRecentMistakesFirstSorter().reorganize(cards)
    expect(cardsSorted[0]).toEqual(cardStatus1)
    expect(cardsSorted[1]).toEqual(cardStatus2)
    expect(cardsSorted[2]).toEqual(cardStatus4)
    expect(cardsSorted[3]).toEqual(cardStatus6)
    expect(cardsSorted[4]).toEqual(cardStatus3)
    expect(cardsSorted[5]).toEqual(cardStatus5)
    expect(cardsSorted[6]).toEqual(cardStatus7)
    expect(cardsSorted[7]).toEqual(cardStatus8)
  })

  test('CardStatus basic methods work correctly', () => {
    const card = newFlashCard('Q', 'A')
    const status = newCardStatus(card)
  
    expect(status.getCard()).toBe(card)
    expect(status.getResults()).toEqual([])
  
    status.recordResult(true)
    status.recordResult(false)
    expect(status.getResults()).toEqual([true, false])
  
    status.clearResults()
    expect(status.getResults()).toEqual([]) // Confirm reset
  })
  
  test('FlashCard basic functionality', () => {
    const card = newFlashCard('What is AI?', 'Artificial Intelligence')
  
    // getQuestion and getAnswer
    expect(card.getQuestion()).toBe('What is AI?')
    expect(card.getAnswer()).toBe('Artificial Intelligence')
  
    // checkSuccess - exact match
    expect(card.checkSuccess('Artificial Intelligence')).toBe(true)
  
    // checkSuccess - extra spaces
    expect(card.checkSuccess('  Artificial Intelligence  ')).toBe(true)
  
    // checkSuccess - case insensitive
    expect(card.checkSuccess('artificial intelligence')).toBe(true)
  
    // checkSuccess - incorrect
    expect(card.checkSuccess('Machine Learning')).toBe(false)
  
    // toString
    expect(card.toString()).toBe('FlashCard[What is AI?, Artificial Intelligence]')
  
    // equals - true
    const card2 = newFlashCard('What is AI?', 'Artificial Intelligence')
    expect(card.equals(card2)).toBe(true)
  
    // equals - false (different question)
    const card3 = newFlashCard('Define AI', 'Artificial Intelligence')
    expect(card.equals(card3)).toBe(false)
  
    // equals - false (different answer)
    const card4 = newFlashCard('What is AI?', 'A fancy robot')
    expect(card.equals(card4)).toBe(false)
  })

  test('sorter fallback return 0 when comparison is inconclusive', () => {
    const cardA = newCardStatus(newFlashCard("Q1", "A1"))
    const cardB = newCardStatus(newFlashCard("Q2", "A2"))
  
    cardA.recordResult(true)  // aLast = true
    // cardB has no history     bLast = undefined
  
    const sorter = newRecentMistakesFirstSorter()
    const sorted = sorter.reorganize([cardA, cardB])
  
    expect(sorted).toContain(cardA)
    expect(sorted).toContain(cardB)
  })  
})
