export class Carousel {
  constructor(el, carouselData) {
    this.el = el;
    // this.carouselOptions = ['previous', 'add', 'play', 'next'];
    this.carouselOptions = [];
    this.carouselData = carouselData;
    this.carouselInView = [1, 2, 3, 4, 5];
    this.carouselContainer;
    this.carouselPlayState;
  }

  mounted() {
    this.setupCarousel();
  }

  // Build carousel html
  setupCarousel() {
    const container = document.createElement('div');
    const controls = document.createElement('div');

    // Add container for carousel items and controls
    this.el.append(container, controls);
    container.className = 'carousel-container';
    controls.className = 'carousel-controls';

    // Take dataset array and append items to container
    this.carouselData.forEach((item, index) => {
      //   const carouselLink = document.createElement('a');

      const carouselItem = item.photo
        ? document.createElement('img')
        : document.createElement('div');
      //   carouselLink.append(carouselItem);
      container.append(carouselItem);

      // Add item attributes
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselItem.src = item.photo;
      carouselItem.setAttribute('loading', 'lazy');
      // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
      carouselItem.setAttribute('data-index', `${index + 1}`);
    });

    this.carouselOptions.forEach(option => {
      const btn = document.createElement('button');
      const axSpan = document.createElement('span');

      // Add accessibilty spans to button
      axSpan.innerText = option;
      axSpan.className = 'ax-hidden';
      btn.append(axSpan);

      // Add button attributes
      btn.className = `carousel-control carousel-control-${option}`;
      btn.setAttribute('data-name', option);

      // Add carousel control options
      controls.append(btn);
    });

    // After rendering carousel to our DOM, setup carousel controls' event listeners
    this.setControls([...controls.children]);

    // Set container property
    this.carouselContainer = container;
  }

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = event => {
        event.preventDefault();

        // Manage control actions, update our carousel data first then with a callback update our DOM
        this.controlManager(control.dataset.name);
      };
    });
  }

  controlManager(control) {
    if (control === 'previous') return this.previous();
    if (control === 'next') return this.next();
    // if (control === 'add') return this.add();
    // if (control === 'play') return this.play();

    return;
  }

  previous() {
    // Update order of items in data array to be shown in carousel
    this.carouselData.unshift(this.carouselData.pop());

    // Push the first item to the end of the array so that the previous item is front and center
    this.carouselInView.push(this.carouselInView.shift());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[
        index
      ].className = `carousel-item carousel-item-${index}`;
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.photo;
    });
  }

  next() {
    console.log(this.carouselData);
    // Update order of items in data array to be shown in carousel
    this.carouselData.push(this.carouselData.shift());

    // Take the last item and add it to the beginning of the array so that the next item is front and center
    this.carouselInView.unshift(this.carouselInView.pop());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      console.log(item);
      this.carouselContainer.children[
        index
      ].className = `carousel-item carousel-item-${index}`;
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      console.log(data);
      document.querySelector(`.carousel-item-${index + 1}`).src = data.photo;
    });
  }

  //   add() {
  //     const newItem = {
  //       id: '',
  //       photo: '',
  //     };
  //     const lastItem = this.carouselData.length;
  //     const lastIndex = this.carouselData.findIndex(item => item.id == lastItem);

  //     // Assign properties for new carousel item
  //     Object.assign(newItem, {
  //       id: `${lastItem + 1}`,
  //       photo: `http://fakeimg.pl/300/?text=${lastItem + 1}`,
  //     });

  //     // Then add it to the "last" item in our carouselData
  //     this.carouselData.splice(lastIndex + 1, 0, newItem);

  //     // Shift carousel to display new item
  //     this.next();
  //   }

  //   play() {
  //     const playBtn = document.querySelector('.carousel-control-play');
  //     const startPlaying = () => this.next();

  //     if (playBtn.classList.contains('playing')) {
  //       // Remove class to return to play button state/appearance
  //       playBtn.classList.remove('playing');

  //       // Remove setInterval
  //       clearInterval(this.carouselPlayState);
  //       this.carouselPlayState = null;
  //     } else {
  //       // Add class to change to pause button state/appearance
  //       playBtn.classList.add('playing');

  //       // First run initial next method
  //       this.next();

  //       // Use play state prop to store interval ID and run next method on a 1.5 second interval
  //       this.carouselPlayState = setInterval(startPlaying, 3000);
  //     }
  //   }
}
