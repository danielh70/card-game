// flipCard = () => {
//   this.setState({
//     flipped: 'card flipit'
//   });
// };

// gameSetup = async () => {

//   if (this.props.chips - this.state.wager < 0) {
//     return;
//   }

//   let p1Hand = [];
//   let compHand = [];
//   let deck = { ...this.state, player1: p1Hand, computer: compHand };
//   let cards = () => Math.floor(Math.random() * deck.player1Deck.length);
//   let x;
//   let p1Deck;
//   let compDeck;
//   deck.inProgress = true;
//   p1Deck = await this.props.buildDeck(p1Deck);
//   compDeck = await this.props.buildDeck(compDeck);
//   deck.player1Deck = p1Deck;
//   deck.computerDeck = compDeck;

//   // add the first 2 drawn cards to variable deck
//   p1Hand.push(deck.player1Deck[cards()]);
//   p1Hand.push(deck.player1Deck[cards()]);

//   // match the index of the first 2 drawn cards and splice them out of the deck
//   let removeFirstP = p1Deck.indexOf(deck.player1[0]);
//   deck.player1Deck.splice(removeFirstP, 1);
//   let removeSecondP = p1Deck.indexOf(deck.player1[1]);
//   deck.player1Deck.splice(removeSecondP, 1);

//   let nu = 0;
//   // computer will keep drawing until their hand value is at least 17
//   while (deck.computerScore < 17 || nu < 1) {
//     nu++;
//     compHand.push(deck.computerDeck[cards()]);
//     let removeFirstC = deck.computerDeck.indexOf(deck.computer[deck.computer.length -1]);
    
//     deck.computerDeck.splice(removeFirstC, 1);

//     let val = Object.keys(deck.computer[deck.computer.length -1 ]);

//     switch (val[0]) {
//     case 'J':
//     case 'Q':
//     case 'K':
//       val = 10;
//       break;
//     case 'A':
//       // val = deck.computerScore <= 10 ? 11 : 1;
//       if (deck.computerScore <= 10) {
//         val = 11;
//         deck.compHighAces++;
//       }
//       else {
//         val = 1;
//       }
//       break;
//     default:
//       val = parseInt(val, 10);
//     }
//     deck.computerScore += val;

//     if (deck.computerScore > 21 && deck.highAces > 0){
//       deck.highAces--;
//       deck.computerScore = deck.computerScore - 10;
//     }
//   }

//   // find the key (value in this case) for every object in the array, and add them up
//   for (x in deck.player1) {
//     let val = Object.keys(deck.player1[x]);

//     switch (val[0]) {
//     case 'J':
//     case 'Q':
//     case 'K':
//       val = 10;
//       break;
//     case 'A':
//       if (deck.player1Score <= 10) {
//         val = 11;
//         deck.highAces++;
//       }
//       else {
//         val = 1;
//       }
//       break;
//     default:
//       val = parseInt(val, 10);
//     }
//     deck.player1Score += val;
//   }

//     this.props.dispatch(getChips(this.props.userInfo))

//     this.setState(deck);       
// };

// drawCard = async () => {
//   const { player1Deck, player1 } = this.state;
//   let state = Object.assign({}, this.state);
//   let getCard = Math.floor(Math.random() * player1Deck.length);
//   state.player1.push(player1Deck[getCard]);
//   let val = Object.keys(player1[player1.length - 1 ]);

//   switch (val[0]) {
//   case 'J':
//   case 'Q':
//   case 'K':
//     val = 10;
//     break;
//   case 'A':
//     if (state.player1Score <= 10) {
//       val = 11;
//       state.highAces++;
//     }
//     else {
//       val = 1;
//     }
//     break;
//   default:
//     val = parseInt(val, 10);
//   }

//   // checkAce();
//   state.player1Score += val;

//   if (state.player1Score > 21 && state.highAces === 0) {
//     state.flipped = 'card flipit';
//     state.statusText = 'loser';
//     state.gameOver = true;
//     state.message = 'YOU BUSTED';
//     await this.adjustChips(this.state.wager, false)
//   }
//   else if (state.player1Score > 21 && state.highAces > 0){
//     state.highAces--;
//     state.player1Score = state.player1Score - 10;
//   }

//   state.player1Deck.splice(getCard, 1);
//   // console.log("init state", initialState);
//   this.setState(state);
// };

// newGame = () => {
//   // callback in setState, to make sure the state is refreshed before making decks
//   this.setState(initialState, () => {
//     // this.gameSetup();
//   });
// };

// handleStand = async () => {
//   const { player1Score, computerScore } = this.state;

//   if (player1Score > computerScore) {
    
//     this.setState({ message: 'YOU WIN!', flipped: 'card flipit', gameOver: true, statusText: 'winner' });
//     await this.adjustChips(this.state.wager, true)

//   } else if (computerScore > player1Score && computerScore > 21) {
    
//     this.setState({ message: 'YOU WIN!', flipped: 'card flipit', gameOver: true, statusText: 'winner'});
//     await this.adjustChips(this.state.wager, true)

//   } else if (computerScore > player1Score && computerScore <= 21){
    
//     this.setState({ message: 'GAME OVER', flipped: 'card flipit', gameOver: true, statusText: 'loser' });
//     await this.adjustChips(this.state.wager, false)

//   } else {

//     this.setState({ message: 'TIE', flipped: 'card flipit', gameOver: true, statusText: 'loser' });
//   }
// };

// adjustChips = (wager, outcome) => {
//   let curState = Object.assign({}, this.props);

//   if (outcome) {
//     curState.chips += wager;
//   }
//   else {
//     curState.chips -= wager;
//   }

//   this.props.userInfo.chips = curState.chips;

//   this.props.dispatch(adjustChips(this.props.userInfo))
// }

// handleChange = e => {
//   let _state = Object.assign({}, this.state)

//   _state[e.target.name] = parseInt(e.target.value);

//   this.setState(_state);
// }

// handleChipClick = e => {
//   let state = Object.assign({}, this.state);

//   state.wager += parseInt(e.target.value);
//   this.setState(state);
// }
