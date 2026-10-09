// A world-clock state machine: pause, cancellation and completion are independent
// of the viewport, frame rate and artwork loading.
export class Transformation {
 constructor(){this.current=null;this.sequence=0;}
 begin(entry,wielder,accent,time,instant=false){this.current={entry,wielder,accent,start:time,duration:instant?0:1.1,done:false,token:++this.sequence};return this.current;}
 tick(time){const s=this.current;if(!s||s.done)return null;if(time-s.start>=s.duration){s.done=true;return s.entry;}return null;}
 figure(time){const s=this.current;return s&&(time-s.start<Math.min(.3,s.duration)?s.wielder:s.entry);}
 cancel(){const pending=this.current&&!this.current.done;this.current=null;this.sequence++;return Boolean(pending);}
}
