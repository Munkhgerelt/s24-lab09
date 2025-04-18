import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      return cards.slice().sort((a, b) => {
        const aResults = a.getResults()
        const bResults = b.getResults()

        const aLast = aResults[aResults.length - 1]
        const bLast = bResults[bResults.length - 1]

        if (aLast === bLast) return 0
        if (!aLast && bLast) return -1
        return 1        
      })
    }
  }
}

export { newRecentMistakesFirstSorter }
