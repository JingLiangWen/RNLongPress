/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  Alert,
  Image
} from 'react-native';
// import PanResponderExample from './PanResponderExample';
import { State, LongPressGestureHandler } from 'react-native-gesture-handler';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    title: '',

    currentTime: 0.0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
    hasPermission: undefined,
    source1: require('./images/ic_record_ripple_1.png'),
    source2: require('./images/ic_record_ripple_2.png'),
    source3: require('./images/ic_record_ripple_3.png'),
    source4: require('./images/ic_record_ripple_4.png'),
    source5: require('./images/ic_record_ripple_5.png'),
    source6: require('./images/ic_record_ripple_6.png'),
    source7: require('./images/ic_record_ripple_7.png'),
    source8: require('./images/ic_record_ripple_8.png'),
    source9: require('./images/ic_record_ripple_9.png'),
    source: require('./images/ic_record_ripple_1.png'),
  }

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000,
      MeteringEnabled: true,

    });
  }

  componentDidMount() {
    this._checkPermission().then((hasPermission) => {
      this.setState({ hasPermission });

      if (!hasPermission) {
        Alert('没有录音权限？')
        return;
      }

      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        console.log('声量：' + data.currentMetering)
        const { currentMetering } = data
        if (0 < currentMetering <= 0.06) {
          console.log('1')
          const source = require('./images/ic_record_ripple_1.png')
          this.setState({ ...this.setState, source: this.state.source1 })
        } else if (0.06 < currentMetering <= 0.13) {
          console.log('2')
          const source = require('./images/ic_record_ripple_2.png')
          this.setState({ ...this.setState, source: this.state.source2 })
        } else if (0.13 < currentMetering <= 0.20) {
          console.log('3')
          const source = require('./images/ic_record_ripple_3.png')
          this.setState({ ...this.setState, source: this.state.source3 })
        } else if (0.20 < currentMetering <= 0.27) {
          console.log('4')
          const source = require('./images/ic_record_ripple_4.png')
          this.setState({ ...this.setState, source: this.state.source4 })
        } else if (0.27 < currentMetering <= 0.34) {
          console.log('5')
          const source = require('./images/ic_record_ripple_5.png')
          this.setState({ ...this.setState, source: this.state.source5 })
        } else if (0.34 < currentMetering <= 0.41) {
          console.log('6')
          const source = require('./images/ic_record_ripple_6.png')
          this.setState({ ...this.setState, source: this.state.source6 })
        } else if (0.41 < currentMetering <= 0.48) {
          console.log('7')
          const source = require('./images/ic_record_ripple_7.png')
          this.setState({ ...this.setState, source: this.state.source7 })
        } else if (0.48 < currentMetering <= 0.55) {
          console.log('8')
          const source = require('./images/ic_record_ripple_8.png')
          this.setState({ ...this.setState, source: this.state.source8 })
        } else
        /*if (0.55 < currentMetering <= 0.62)*/ {
          console.log('9')
          const source = require('./images/ic_record_ripple_9.png')
          this.setState({ ...this.setState, source: this.state.source9 })
        }
        // else if (0.62 < currentMetering <= 0.69) {
        //   const source = require('./images/ic_record_ripple_4.png')
        //   this.setState({ ...this.setState, source })
        // } else if (0.69 < currentMetering <= 0.76) {
        //   [self.imageview setImage: [UIImage imageNamed:@"record_animate_11.png"]];
        // } else if (0.76 < currentMetering <= 0.83) {
        //   [self.imageview setImage: [UIImage imageNamed:@"record_animate_12.png"]];
        // } else if (0.83 < currentMetering <= 0.9) {
        //   [self.imageview setImage: [UIImage imageNamed:@"record_animate_13.png"]];
        // } else {
        //   [self.imageview setImage: [UIImage imageNamed:@"record_animate_14.png"]];
        // }//图片根据音量来变化,大家知道就好

        this.setState({ currentTime: Math.floor(data.currentTime) });
      };

      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(data.status === "OK", data.audioFileURL);
        }
      };
    });
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  _renderButton(title, onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;

    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }

  _renderPauseButton(onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;
    var title = this.state.paused ? "RESUME" : "PAUSE";
    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }

  async _pause() {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!');
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({ paused: true });
    } catch (error) {
      console.error(error);
    }
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn('Can\'t resume, not paused!');
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({ paused: false });
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({ stoppedRecording: true, recording: false, paused: false });

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({ recording: true, paused: false });

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath) {
    this.setState({ finished: didSucceed });
    console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
  }

  _handleStateChange = ({ nativeEvent }) => {
    console.log(nativeEvent)
    if (nativeEvent.state === State.ACTIVE) {
      console.log('开始录音')
      this.setState({ title: '正在录音' })
      // start

      this._record()


    }

    if (nativeEvent.state === State.END) {
      console.log('结束录音')
      this.setState({ title: '录音结束' })


      this._stop()
      // end
    }
  };

  render() {
    const { source } = this.state
    console.log('source:' + source)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{this.state.title}</Text>

        {this._renderButton("RECORD", () => { this._record() }, this.state.recording)}
        {this._renderButton("PLAY", () => { this._play() })}
        {this._renderButton("STOP", () => { this._stop() })}
        {/* {this._renderButton("PAUSE", () => {this._pause()} )} */}
        {this._renderPauseButton(() => { this.state.paused ? this._resume() : this._pause() })}
        <Text style={styles.progressText}>{this.state.currentTime}s</Text>
        <Image source={source} 
        key={new Date()} 
        />
        <LongPressGestureHandler
          enabled
          // maxDist={-1}
          minDurationMs={100}
          onHandlerStateChange={this._handleStateChange}
          onGestureEvent={({ nativeEvent }) => {
            // console.log(nativeEvent)
            const { y } = nativeEvent
            if (y >= 0) {
              this.setState({ title: '正在录音' })
            } else {
              this.setState({ title: '可以取消录音' })
              // this._stop()
            }
          }}
        >
          <View style={{ height: 60, backgroundColor: 'red', marginTop: 'auto' }}></View>
        </LongPressGestureHandler>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#2b608a",
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: "#fff"
  },
  button: {
    padding: 20
  },
  disabledButtonText: {
    color: '#eee'
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  activeButtonText: {
    fontSize: 20,
    color: "#B81F00"
  }
});
