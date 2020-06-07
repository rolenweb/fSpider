
class Ads {
    constructor(turnOn, element, messageLang, advertisers) {
        this.turnOn = turnOn;
        if (turnOn){
            this.element = element;
            this.messageLang = messageLang;
            this.advertisers = advertisers;
            this.init();
        }else{
            element.remove();
        }

    }
    init(){
        this.defaultTimeout = 5;
        this.timeout = 5;
        this.currentAdvertiserIndex = 0;
        this.maxAdvertiserIndex = this.advertisers.video.length - 1;
        this.initVideoAds();
        this.initSkipAdsButton();
        this.initLabel();

    }
    initLabel(){
        let label = document.createElement('div');
        label.style.height = '23px';
        label.style.paddingLeft = '10px';
        label.style.paddingRight = '10px';
        label.style.borderColor = 'white';
        label.style.borderRadius = '5px';
        label.style.backgroundColor = 'white';
        label.style.cursor = 'pointer';

        //position
        label.style.position = 'absolute';
        label.style.top = '10px';
        label.style.left = '10px';

        //content
        label.style.fontSize = '20px';
        label.textContent = this.messageLang.ad

        this.label = {
            'label': label,
        }
        this.element.appendChild(label);
    }
    initSkipAdsButton(){
        let button = document.createElement('div');
        //appearance
        button.style.height = '35px';
        button.style.borderColor = 'white';
        button.style.borderRadius = '5px';
        button.style.backgroundColor = 'white';
        button.style.cursor = 'pointer';
        //position
        button.style.position = 'absolute';
        button.style.bottom = '10px';
        button.style.right = '10px';

        //content
        let content = document.createElement('div');
        content.style.paddingLeft = '5px';
        content.style.paddingTop = '5px';
        content.style.paddingRight = '5px';
        content.style.paddingBottom = '5px';
        content.style.fontSize = '20px';
        content.textContent = this.messageLang.skip_ads;


        this.skipAdsButton = {
            'button': button,
            'content': content
        };

        this.skipAdsButton.button.appendChild(content);
        this.element.appendChild(this.skipAdsButton.button)

        //set timer
        this.setTimeoutToSkipAdsButton();

        //event
        this.skipAdsButton.button.addEventListener('click', (event) => this.onClickSkipAdsButton() )

    }
    initVideoAds(){
        let container = document.createElement('a');
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.cursor = 'pointer';
        container.setAttribute('rel', 'sponsored nofollow');
        container.setAttribute('target', '_blank');
        let video = document.createElement('video');
        //video.poster = 'content/images/loader.gif';
        video.autoplay = true;
        video.style.width = 'inherit';
        video.style.height = 'inherit';
        this.video = {
            'container': container,
            'video': video
        }
        this.updateVideo();
        container.appendChild(video);
        this.element.appendChild(container);

        this.video.container.addEventListener('click', function () {

        });
    }
    updateVideo(){
        this.video.video.src = 'content/video/' + this.advertisers.video[this.currentAdvertiserIndex].src;
        this.video.video.type = this.advertisers.video[this.currentAdvertiserIndex].type;

        this.video.container.setAttribute('href', this.advertisers.video[this.currentAdvertiserIndex].target)
    }
    hide(){
        this.element.style.display = 'none';
    }
    show(){
        this.element.style.display = 'block';
    }
    showVideoAds(){
        this.show();
        this.updateVideo();
        this.resetTimeout();
        this.setTimeoutToSkipAdsButton();
    }
    setContentSkipAds(content){
        this.skipAdsButton.content.textContent = content;
    }
    hideSkipAdsButton(){
        this.skipAdsButton.button.style.display = 'none';
    }
    showSkipAdsButton(){
        this.skipAdsButton.button.style.display = 'block';
    }
    setTimeoutToSkipAdsButton(){
        const _this = this;
        _this.setContentSkipAds(_this.timeout+' '+_this.messageLang.sec);
        if (_this.timeout == 0){
            _this.setContentSkipAds(_this.messageLang.skip_ads);
            return;
        }
        setTimeout(function () {
            _this.timeout--;
            _this.setTimeoutToSkipAdsButton();
        },1000)
    }
    resetTimeout(){
        this.timeout = this.defaultTimeout;
    }
    updateCurrentAdvertiserIndex(){
        if (this.currentAdvertiserIndex < this.maxAdvertiserIndex){
            this.currentAdvertiserIndex++
            return;
        }
        this.currentAdvertiserIndex = 0;
    }
    onClickSkipAdsButton(){
        if (this.timeout > 0){
            return;
        }
        this.hide();
        this.video.video.pause();
        this.updateCurrentAdvertiserIndex();

        this.element.dispatchEvent(new CustomEvent('ClickSkipAdsButton'));
    }


}