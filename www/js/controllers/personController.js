angular.module('meosApp')
    .controller('personController', function($scope, $state, Restangular) {
            var personCtrl = this;

            var anyline = {
                callback: {
                    success: function(result) {
                        var keno = result.surNames.substring(0, 4) + result.givenNames[0] + result.dayOfBirth.substring(0, 2);
                        $rootScope.keno = obj.string;
                        $state.go('results.ib');
                    },
                    error: function() {
                        // Error callback
                        alert('Error');
                    }
                },
                options: [
                    "eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiXSwidmFsaWQiOiIyMDE3LTA3LTMxIiwibWFqb3JWZXJzaW9uIjoiMyIsImlz" +
                    "Q29tbWVyY2lhbCI6ZmFsc2UsInRvbGVyYW5jZURheXMiOjYwLCJpb3NJZGVudGlmaWVyIjpbImNvbS5tZW9zcGEuYXBwIl0sImFuZHJvaWRJZGVudGlmaWVyIjpbImNvbS5t" +
                    "ZW9zcGEuYXBwIl0sIndpbmRvd3NJZGVudGlmaWVyIjpbImNvbS5tZW9zcGEuYXBwIl19CnkxYzRSMUVqUUxxL3ROczM4WUlTZDBPc1o3bEV2enIxTDR1ckZrem5lUHhoUTUy" +
                    "bmVCSVUxb3hQc3dJbU9GT3hCUWtRNmhtb1RlYUxUZGpIZ3RhQUxiOXFaM1BUSmhGQ3g2bW11TXk3Z3pWYVpHSU42QW9mZVg5THVQQ3NqQnJCYkhQM3pkVElIM2REV2hqdHhs" +
                    "S1N2OUZVM01Ba0JMaFhMcTkxQ0VORHdFMmpsbGtLMFNBdjJ4N1cxRWJPU0pOdWpwazFyRlpSNWxBdTJKRjkwSUFOVU8yTGdzZFBWRlkvYTBaOFhsU200RXA5MFFtRTVBRnlB" +
                    "dU1wNDBPQkpIQjVjQVBVTGdDSmI0VENkTWlKd1A1SjY4RlBHcCtYZEEyZ05uZXpZYWtQREVGRm43QW1iaTBSRDBySWVPWFZqWUJ2S05zV2xNa3BhTWpucHJlV0xvOThOZz09",
                    {
                        "captureResolution": "1080p",
                        "cutout": {
                            "style": "rect",
                            "maxWidthPercent": "90%",
                            "maxHeightPercent": "90%",
                            "alignment": "top_half",
                            "strokeWidth": 2,
                            "cornerRadius": 4,
                            "strokeColor": "FFFFFF",
                            "outerColor": "000000",
                            "outerAlpha": 0.3
                        },
                        "flash": {
                            "mode": "manual",
                            "alignment": "bottom_right"
                        },
                        "beepOnResult": true,
                        "vibrateOnResult": true,
                        "blinkAnimationOnResult": true,
                        "cancelOnResult": true
                    }
                ]
            };

            personCtrl.scan = function() {
                cordova.exec(anyline.callback.success, anyline.callback.fail, "AnylineSDK", "MRZ", anyline.options);
            }
    });