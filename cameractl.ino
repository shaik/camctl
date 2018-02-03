/* Camera Control
  by ShaiK
*/

#include < Servo.h >

  typedef struct SERVOPOS {
    int h;
    int v;
  }
Servopos;

Servo vServo, hServo; // create servo object to control a servo
// twelve servo objects can be created on most boards
int incomingByte = 0; // for incoming serial data
String incomingStr;

Servopos pos;

const int hPort = 8;
const int vPort = 9;

void setup() {
  pos.h = 90;
  pos.v = 90;
  Serial.begin(9600);
  vServo.attach(vPort); // attaches the servo on pin 9 to the servo object
  hServo.attach(hPort); // attaches the servo on pin 9 to the servo object
}

void loop() {
  vServo.write(pos.v);
  hServo.write(pos.h);
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingStr = Serial.readString();
    Servopos newPos = split(incomingStr);

    if (pos.h != newPos.h && newPos.h > -1 && newPos.h < 181) {
      pos.h = newPos.h;
    }

    if (pos.v != newPos.v && newPos.v > 40 && newPos.v < 181) {
      pos.v = newPos.v;
    }

    // say what you got:
    Serial.print("I received: ");
    Serial.println(pos.h, DEC);
  }
}

Servopos split(String s) {
  Servopos pos;
  String s1, s2;
  int p = s.indexOf('&');
  s1 = s.substring(0, p);
  s2 = s.substring(p + 1);
  pos.h = s1.toInt();
  pos.v = s2.toInt();
  /*
  Serial.println(p, DEC);
  Serial.print("s1: ");
  Serial.println(s1.toInt(), DEC);
  Serial.print("s2: ");
  Serial.println(s2.toInt(), DEC);
  */
  return pos;
}