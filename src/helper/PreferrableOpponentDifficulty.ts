/** Defines the range of opponent valor relative to current player for matchmaking.
 * 
 * player_valor * (1 + leastBoundRatio) + leastBound <= opponent_valor <= player_valor * (1 + mostBoundRatio) + mostBound
 */
export default class PreferrableOpponentDifficulty {
    public static default = new PreferrableOpponentDifficulty(-500, -0.5, 500, 0.5);

    public leastBound: number;
    public leastBoundRatio: number;
    public mostBound: number;
    public mostBoundRatio: number;

    constructor(leastBound: number, leastBoundRatio: number, mostBound: number, mostBoundRatio: number) {
      this.leastBound = leastBound;
      this.leastBoundRatio = leastBoundRatio;
      this.mostBound = mostBound;
      this.mostBoundRatio = mostBoundRatio;
    }


    getRangeOf(playerValor: number){
        return {
            least: playerValor * (1 + this.leastBoundRatio) + this.leastBound,
            most: playerValor * (1 + this.mostBoundRatio) + this.mostBound,
        };
    }

    /**
     * @param {*} scale: The scale to all bounds.
     * @returns a new PreferrableOpponentDifficulty with all bounds scaled by `scale`
     */
    scaled(scale: number){
        return new PreferrableOpponentDifficulty(this.leastBound*scale, this.leastBoundRatio*scale, this.mostBound*scale, this.mostBoundRatio*scale);
    }
}