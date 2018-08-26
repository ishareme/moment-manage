<template>
    <div class="cover-image-clip">
        <div v-show="showBool" class="img-box">
            <div v-show="!upDoneBool" class="img-clip-wrap">
                <div class="container-bg">
                    <div class="img-container">
                        <img id="clip_src_img" @load="srcImgLoaded" :src="img">
                        <div class="shadow-box"></div>
                        <select-box ref="box" :srcSize="imgSize" :ratio="ratio" :img="img" @selectEnd="selectEnd"
                                    @selectChange="selectChange"></select-box>
                    </div>
                </div>
            </div>
            <div class="img-preview-wrap">
                <div class="pre-container" :style="preImageHeight">
                    <img id="clip_res_img" :src="img">
                </div>
                <div class="pre-info">预览</div>
            </div>
        </div>

        <div class="btns">
            <div class="cover-upload-btn">
                <el-button size="small" icon='el-icon-upload' class="cover-upload-btn" type="primary">
                    上传图片
                    <input type="file" id="file_input" accept="image/jpg,image/jpeg,image/png,image/gif" @change="fileChange">
                </el-button>
            </div>

            <div v-show="showBool" class="cover-confirm-btn">
                <el-button size="small" v-show="!upDoneBool" icon='el-icon-check' class="cover-upload-btn" type="primary" :loading="confirmBtnLoading" @click="handleConfirm">
                    确定
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import SelectBox from './components/SelectBox.vue'

    export default {
        name: 'cover-image-clip',
        components: {
            SelectBox
        },
        props: ['confirmBtnLoading','upDoneBool', 'type' ],
        watch: {
            confirmBtnLoading(newVal){
                console.log('confirmBtnLoading',newVal)
                this.confirmBtnLoading = newVal
            }
        },
        data () {
            return {
                showBool: false,
                meUpDoneBool: this.upDoneBool,
                img: null,
                $srcImg: null,
                $resImg: null,
                $input: null,
                $imgContainer: null,
                $preContainer: null,
                nw: 0,
                nh: 0,
                clipData: null,
                ratio: this.type === 'MusicArticle' ? 1 / 1 : 16 / 10, // equal to SelectBox's width / height
                imgSize: {w: 0, h: 0},
                containerTop: 0,
                preImageHeight: {
                    height: this.type === 'MusicArticle' ? '240px' : '150px'
                }
            }
        },
        mounted () {
            this.$input = this.$el.querySelectorAll('#file_input')[0]
            this.$srcImg = this.$el.querySelectorAll('#clip_src_img')[0]
            this.$resImg = this.$el.querySelectorAll('#clip_res_img')[0]
            this.$imgContainer = this.$el.querySelectorAll('.img-container')[0]
            this.$preContainer = this.$el.querySelectorAll('.pre-container')[0]
            this.$containerBox = this.$el.querySelectorAll('.container-bg')[0]
        },
        methods: {
            selectChange () {
                const rec = this.$refs.box.rec
                if (rec.w > 0 && rec.h > 0) {
                    this.updatePreview()
                }
            },
            selectEnd () {
                const rec = this.$refs.box.rec
                if (rec.w > 0 && rec.h > 0) {
                    this.clip()
                }
            },
            fileChange () {
                const me = this
                const fd = new FileReader()
                fd.onloadend = function () {
                    me.img = fd.result
                };
                if (this.$input.files && this.$input.files[0]) {
                    fd.readAsDataURL(this.$input.files[0])
                }
                this.showBool = true
                this.meUpDoneBool = false
            },
            srcImgLoaded () {
                this.nw = this.$srcImg.naturalWidth
                this.nh = this.$srcImg.naturalHeight
                this.clearSelect()
                this.setImgSize()
                this.updatePreview()
                this.clip()
            },
            clearSelect () {
                const box = this.$refs.box
                box.clearRec()
                this.clipData = null
            },
            setImgSize () {
                // image's naturalWidth naturalHeight ratio
                const nr = this.nw / this.nh
                const scw = this.$containerBox.offsetWidth
                const sch = this.$containerBox.offsetHeight
                let rw = 0  // select box width
                let rh = 0  // select box height
                if (nr >= this.ratio) {
                    this.imgSize.w = scw
                    this.imgSize.h = scw / nr
                    this.containerTop = (sch - this.imgSize.h) / 2
                    rh = this.imgSize.h
                    rw = rh * this.ratio
                } else {
                    this.imgSize.h = sch
                    this.imgSize.w = sch * nr
                    this.containerTop = 0
                    rw = this.imgSize.w
                    rh = rw / this.ratio
                }
                this.$srcImg.setAttribute('style', `width:${this.imgSize.w}px;height:${this.imgSize.h}px;`)
                this.$imgContainer.setAttribute('style',
                    `width:${this.imgSize.w}px;height:${this.imgSize.h}px;top:${this.containerTop}px;`)
                this.$refs.box.rec = {w: rw, h: rh, l: 0, t: 0}
            },
            getComputedRec (r) {
                const cw = this.$imgContainer.offsetWidth
                const ch = this.$imgContainer.offsetHeight
                const wr = cw / this.nw
                const hr = ch / this.nh
                return {
                    l: r.l / wr, t: r.t / hr,
                    w: r.w / wr, h: r.h / hr
                }
            },
            updatePreview () {
                const rec = this.$refs.box.rec
                const pcw = this.$preContainer.offsetWidth
                const pch = this.$preContainer.offsetHeight
                const wr = pcw / rec.w
                const hr = pch / rec.h
                const w = wr * this.$imgContainer.offsetWidth
                const h = hr * this.$imgContainer.offsetHeight
                const l = -rec.l * wr
                const t = -rec.t * hr
                this.$resImg.setAttribute('style',
                    `width:${w}px;height:${h}px;top:${t}px;left:${l}px;`)
            },
            clip () {
                let rec = this.$refs.box.rec
                if (!rec.w || !rec.h) {
                    return
                }

                const bufferCanvas = document.createElement('canvas')
                const bfx = bufferCanvas.getContext('2d')
                const computedRec = this.getComputedRec(rec)
                bufferCanvas.width = computedRec.w
                bufferCanvas.height = computedRec.h
                bfx.drawImage(this.$srcImg, -computedRec.l, -computedRec.t, this.nw, this.nh)
                this.clipData = bufferCanvas.toDataURL(this.$input.files[0].type.indexOf('jp') > -1 ? 'image/jpeg' : 'image/png', 1)
            },
            handleConfirm(){
                console.log('this.confirmBtnLoading',this.confirmBtnLoading)
                this.$emit('handleConfirm', this.clipData)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cover-image-clip{
        .img-box{
            display: flex;
            align-items: center;
            .img-clip-wrap {
                width: 500px;
                height: 330px;
                .container-bg {
                    width: 480px;
                    height: 300px;
                    background-color: #ffbec3;
                    border-radius: 4px;
                    .img-container {
                        position: relative;
                        height: 0;
                        margin: auto;
                        img {
                            position: relative;
                            width: 100%;
                            height: 100%;
                        }
                        .shadow-box {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, .5);
                            z-index: 1;
                        }
                    }
                }
            }
            .img-preview-wrap {
                width: 240px;
                margin-left: 6%;
                .pre-container {
                    width: 100%;
                    background-color: #ff9997;
                    overflow: hidden;
                    border-radius: 4px;
                    img {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        border-radius: 4px;
                    }
                }
                .pre-info {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #99a2aa;
                }
            }
        }
        .btns{
            margin-top: 20px;
            display: flex;
            .cover-upload-btn , .cover-confirm-btn{
                position: relative;
                display: inline-block;
                color: #fff;
                cursor: pointer;
                overflow: hidden;
                .cover-upload-btn{
                    background-color: #1890ff;
                }
                input {
                    position: absolute;
                    font-size: 100px;
                    right: 0;
                    top: 0;
                    opacity: 0;
                    cursor: pointer
                }
                &:hover {
                    color: #45d645;
                }
            }
            .cover-confirm-btn{
                margin-left: 6%;
            }
        }
    }
</style>