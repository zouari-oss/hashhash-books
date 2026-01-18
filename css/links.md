# Links
- 
---
# Notes
## Transforms
- **transform: translate** repositions an element horizontally and/or vertically. Providing 1 single value moves the element horizontally.
	![[Pasted image 20240929223157.png]]
- Transformations are not permanent changes. They are used to create visual effects.
- When **translate** is used with 2 values, the visual effect moves the element both horizontally and vertically.
	![[Pasted image 20240929223326.png]]
- **transform: scale** makes an element bigger or smaller, preserving its aspect ratio. The original size has a value of 1, so a value of 2 will double the width and height. 0.5 will halve them.
- Rotate elements with **transform: rotate**.
```css
	transform: rotate(90deg);  // "90 degrees clockwise"
```
- By default, rotations take place around the center of the element. Use **transform-origin** to change the point around which the rotation takes place. transform-origin requires the horizontal and vertical position of the new point of reference:
	![[Pasted image 20240929223758.png]]
## Transitions
- **CSS transitions** are changes in element properties that happen over a period of time. They can be applied to a wide variety of properties and elements.
	![[Pasted image 20240929225215.png]]
- A transition requires at least: a **property** (that will change), its **initial value**, its **final value**, a **duration**, and a **trigger**.
	![[Pasted image 20240929225306.png]]
- Use **transition-delay** to add a waiting time before the transition effect.
```css
	transition: width 2s, background-color 1s;
	transition-delay: 2s;  // "2-second delay before starting"
```
- You can add transition effects to a transformation.
## Keyframes & Animations
- Animations are used to produce more complex animations with more intermediate states. With animations, you can change as many properties as you need, as many times as you need.
- Animations need **keyframes** to hold the styles that the element will have at certain times.
- **Keyframes** are snapshots with the important intermediate states that define an animation.
- A new animation needs to be given an **animation-name**. Use **@keyframes** followed by the animation-name to define the intermediate states.
```css
div {
	width: 150px;
	height: 150px;
	position: relative;
	margin: 50px;
	animation-name: snakeMove;
	animation-duration: 5s;
}
@keyframes snakeMove {
	0% {
	background-color: #7B41EA;
	bottom: 0;
	left: 0;
	} 33% {
	background-color: #CCB4FB;
	bottom: 40px;
	left: 40px;
	} 66% {
	background-color: #C833FD;
	bottom: 0;
	left: 80px;
	} 100% {
	background-color: #F91583;
	bottom: 40px;
	left: 120px;
	}
}
```
- **animation-duration** controls the time it takes for the element to move from the first keyframe to the final one.
- Transition requires a trigger.
- Animation can play automatically.
- As an alternative to using percentages for keyframes, you can use **from** and **to** keywords when there are only 2 frames for the animation:
	![[Pasted image 20240930231433.png]]
## Animation Properties
- An animation is a sequence of images, known as **frames**. **Keyframes** are important frames that define the start and the end of a smooth transition.
- Transitions between 2 keyframes are smooth and calculated automatically based on the **speed function**. The speed function controls how fast the changes happen at different phases of the transition.
	![[Pasted image 20241007230135.png]]
- Frames between 2 keyframes are automatically generated based on the speed function. The default speed function is **ease**.
	![[Pasted image 20241007230244.png]]
- You can set alternatives to the default speed function with the **animation-timing-function**
	![[Pasted image 20241007230345.png]]
- An animation is a sequence of transitions. Each transition happens between 2 keyframes. You can also set the speed function when working with transitions. The property name for transitions is **transition-timing-function** with the same default value
- The **animation-iteration-count** property determines the number of times an animation repeats.
- To make the animation repeat forever, just use the **infinite** value with animation-iteration-count.
- The **animation** property can be used as a shorthand for all animation-related properties.
	![[Pasted image 20241007230743.png]]
- 