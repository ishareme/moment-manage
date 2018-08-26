<template>
    <div class="createPost-container">
        <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">
            <sticky class="sub-nav" :stickyTop=100>
                <div class="btn">
                    <!--发布 4-->
                    <el-button v-loading="" v-if="postForm.role === 'admin'" style="margin-left: 10px;" type="primary" round @click="handleToRelease(4)" :disabled="postForm.status === 4">
                        {{postForm.status === 4 ? '已发布' : '发布'}}
                    </el-button>
                    <!--审核 1-->
                    <el-button v-loading="" v-if="postForm.role === 'author'" style="margin-left: 10px;" type="primary" round @click="handleToRelease(1)" :disabled="postForm.status === 1">
                        {{postStatus === 1 ? '审核中' : '发布审核'}}
                    </el-button>
                    <!--草稿 0-->
                    <el-button v-loading="" v-if="!!postForm.status == 0"  type="primary" round @click="handleToRelease(0)" :disabled="postStatus === 'saved'">
                        草稿
                    </el-button>
                    <!--更新  5没有状态 代表更新-->
                    <el-button v-loading="" v-if="isEdit && (postForm.status === 1 || postForm.status === 2 || postForm.status === 3 || postForm.status === 4)" style="margin-left: 10px;" type="primary" round @click="handleToRelease(5)" >
                        更新
                    </el-button>
                </div>
            </sticky>
            <div class="createPost-main-container">
                <el-row>
                    <el-col :span="21">
                        <el-form-item style="margin-bottom: 40px;" prop="title">
                            <material-input name="name" v-model="postForm.title" required :maxlength="100">
                                标题
                            </material-input>
                            <span v-show="postForm.title.length>=26" class='title-prompt'>app可能会显示不全</span>
                        </el-form-item>

                        <div class="postInfo-container">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item v-if="postForm.role === 'admin' && isEdit === false" prop="author" label-width="45px" label="作者:" class="postInfo-container-item">
                                        <el-select
                                                v-model="searchNameKey"
                                                filterable
                                                :filter-method="filterAuthorName"
                                                placeholder="请输入作者关键字"
                                                @change="selectAuthorName"
                                        >
                                            <el-option
                                                    v-for="item in filterOpt"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item v-if="postForm.role === 'author' || isEdit === true" label-width="45px" label="作者:" class="postInfo-container-item">
                                        <el-button type="text" disabled>{{postForm.author_name}}</el-button>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="8" :offset="2">
                                    <el-form-item label-width="100px" label="预发布时间:" class="postInfo-container-item">
                                        <el-date-picker :picker-options="pickerOptions" v-model="postForm.pre_release_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>

                <el-form-item v-if="type === 'ReadingArticle' || type === 'MusicArticle'" style="margin-bottom: 40px;" label-width="45px" label="摘要:">
                    <el-tooltip class="item" effect="dark" content="不写默认为正文前25个字" placement="left">
                        <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="postForm.abstract">
                        </el-input>
                        <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
                    </el-tooltip>
                </el-form-item>

                <el-form-item v-if="type === 'FilmArticle'" style="margin-bottom: 40px;" label-width="75px" label="影视名称:">
                    <el-input placeholder="请输入影视名" v-model="postForm.film_info.name" class="film-name">
                    </el-input>
                </el-form-item>
                <el-form-item v-if="type === 'FilmArticle'" style="margin-bottom: 40px;" label-width="75px" label="经典台词:">
                    <el-input placeholder="请输入经典台词" v-model="postForm.film_info.quote" class="film-quote">
                    </el-input>
                </el-form-item>

                <div class="editor-container">
                    <tinymce :id="tinymceId" :height=500 ref="editor" v-model="postForm.content"></tinymce>
                </div>

                <div class="music-container" v-if="type === 'MusicArticle'">
                    <div class="dec">音乐版块设置</div>
                    <el-row v-if="isEdit">
                        <el-col :span="8">
                            <div class="show_player"></div>
                            <div class="origin-music-text">原音乐</div>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="8">
                            <el-autocomplete
                                    v-model="searchMusicKey"
                                    :fetch-suggestions="searchMusic"
                                    placeholder="请输入音乐名"
                                    @select="handleSelectMusic"
                                    class="searchMusicInput"
                            >
                                <i class="el-icon-search el-input__icon" slot="suffix"></i>
                            </el-autocomplete>
                        </el-col>
                        <el-col :offset="1" :span="10">
                            <div class="player"></div>
                        </el-col>
                    </el-row>
                </div>

                <div class="sound-container" v-if="type === 'SoundArticle'">
                    <div class="dec">电台版块设置</div>
                    <el-row v-if="isEdit">
                        <el-col :span="12">
                            <div class="show_sound_player"></div>
                            <div class="origin-sound-text">原电台</div>
                        </el-col>
                    </el-row>
                    <el-row align="center">
                        <el-col :span="8">
                            <el-upload
                                    class="upload-demo"
                                    drag
                                    action="https://upload-z0.qiniup.com"
                                    :http-request = upqiniu
                                    :before-upload="beforeUpload"
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传录制文件</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传MP3文件，且不超过50MB</div>
                                <el-progress v-show="showProgress" :percentage="soundUploadPercent" :status="soundUploadStatus"></el-progress>
                            </el-upload>
                        </el-col>
                        <el-col :offset="1" :span="10">
                            <div class="sound_play"></div>
                        </el-col>
                    </el-row>
                </div>

                <div class="post-cover">
                    <div class="dec">封面版块设置</div>
                    <cover-image-clip :type="type" @handleConfirm="handleCoverConfirm" :confirmBtnLoading="confirmBtnLoading" :upDoneBool="upDoneBool"></cover-image-clip>
                </div>
            </div>
        </el-form>

    </div>
</template>

<script>
import Sticky from '../../components/Sticky/Sticky'
import Tinymce from '../../components/Tinymce'
import MaterialInput from '../../components/MaterialInput/MaterialInput'
import CoverImageClip from '../../components/CoverImageClip/CoverImageClip'

import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import types from '../../store/types';

import * as qiniu from 'qiniu-js'

export default {
    name: 'articleDetail',
    components: { Sticky, Tinymce, MaterialInput, CoverImageClip },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        },
        postId: {
            type: String,
        },
        tinymceId: {
            type: String,
        },
        defaultForm: {
            type: Object
        },
        type: {
            type: String
        }
    },
    data() {
        return {
            searchMusicKey: '',
            postStatus: 'draft',  //'draft' or 'published' or 'checking'
            confirmBtnLoading: false,
            upDoneBool: false,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '明天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周后',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            postForm: this.defaultForm,
            fetchSuccess: true,
            rules: {
                title: [
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                this.$message({
                                    message: '标题为必传项',
                                    type: 'error'
                                })
                                callback()
                            }
                            else {
                                callback()
                            }
                        } ,
                        trigger: 'blur'
                    },
                ],
            },
            allAdminUserNameList: [],
            searchNameKey: [],
            filterOpt: [],
            soundUploadStatus: '',
            soundUploadPercent: 0,
            showProgress: false,
            soundUrl: ''
        }
    },
    created() {
        if (this.isEdit) {
            this.axios[`get${this.type}ById`]({_id: this.postId}).then((res) => {
                this.postForm = Object.assign(this.defaultForm, res.data.data)
                console.log('this.postForm',this.postForm)
                if (this.type === 'MusicArticle'){
                    window.mePlayer({
                        music : {
                            src   : this.postForm.music_info.url,
                            title : this.postForm.music_info.name,
                            author: this.postForm.music_info.singer,
                            cover : this.postForm.music_info.cover,
                            // lrc   : '歌词字符串：[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n ...'
                        },
                        target: '.show_player',
                        autoplay: true // 是否自动播放
                    });
                }
                if (this.type === 'SoundArticle'){
                    window.mePlayer({
                        music : {
                            src   : this.postForm.sound_url,
                            title : this.postForm.title,
                            author: this.postForm.author,
                            cover : `http://p89inamdb.bkt.clouddn.com/default_av.jpg`,
                            // lrc   : '歌词字符串：[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n ...'
                        },
                        target: '.show_sound_player',
                        autoplay: true // 是否自动播放
                    });
                }
            })
        } else {
            this.postForm = Object.assign({}, this.defaultForm)
        }
    },
    mounted() {
        this.getAllAdminUserName().then(() => {
            this.filterOpt = this.allAdminUserNameList = this.allAdminUserName.map(item => {
                return { value: item.username, label: item.username };
            })
        })

        this.$notify({
            title: '温馨提示',
            message: '记得及时保存文章哦~',
            type: 'info',
            duration: 5000
        });
    },
    computed: {
        ...mapGetters([
            'allAdminUserName',
        ]),
        contentShortLength() {
            return this.postForm.abstract.length
        }
    },
    watch: {

    },
    methods: {
        ...mapActions({
            getAllAdminUserName: types.GET_ALLADMINUSERNAME,
            getAdminInfo: types.GET_ADMININFO
        }),
        filterAuthorName(query) {
            if (query !== '') {
                this.filterOpt = this.allAdminUserNameList.filter(item => {
                    return item.label.toLowerCase()
                        .indexOf(query.trim().toLowerCase()) > -1;
                });
            } else {
                this.filterOpt = this.allAdminUserNameList;
            }
        },
        selectAuthorName(val){
            this.postForm.author = val
        },
        handleToRelease(status) {
            this.$refs.postForm.validate(valid => {
                if (valid) {
                    if (this.postForm.title === ''){
                        this.$message({
                            message: '标题为必传项',
                            type: 'error'
                        })
                    }
                    else if (this.postForm.author === ''){
                        this.$message({
                            message: '作者为必传项',
                            type: 'error'
                        })
                    }
                    else if (this.postForm.content.replace('<p><br data-mce-bogus="1"></p>','').length <= 0){
                        this.$message({
                            message: '内容为必传项',
                            type: 'error'
                        })
                    }
                    else if ((!this.postForm.music_info && this.type === 'MusicArticle')){
                        this.$message({
                            message: '音乐版块必选哦~',
                            type: 'error'
                        })
                    }
                    else if ((this.type === 'FilmArticle' && !this.postForm.film_info.name) || (this.type === 'FilmArticle' && !this.postForm.film_info.quote)){
                        this.$message({
                            message: !this.postForm.film_info.name ? '影视名称必填哦~' : '经典台词必填哦~',
                            type: 'error'
                        })
                    }
                    else if (this.postForm.sound_url === '' && this.type === 'SoundArticle'){
                        this.$message({
                            message: '电台版块必选哦~',
                            type: 'error'
                        })
                    }
                    else if (this.postForm.cover_url === ''){
                        this.$message({
                            message: '封面版块必选哦~',
                            type: 'error'
                        })
                    }
                    else {
                        this.postForm.author = this.isEdit ? this.postForm.author_name : this.postForm.author
                        if (status === 5){
                            //更新
                            this.postForm.item = 'all'
                            console.log('this.postForm',this.postForm)
                            this.axios[`update${this.type}Info`](this.postForm).then(res => {
                                this.$notify({
                                    title: res.data.status ? '成功' : '失败',
                                    message: res.data.message,
                                    type: res.data.status ? 'success' : 'error'
                                });
                                if (res.data.status){
                                    setTimeout(() => {
                                        this.$router.push({
                                            path: 'list'
                                        });
                                    },500)
                                }
                            })
                        }
                        else {
                            //发布
                            if (this.isEdit){
                                this.postForm.status = status
                                this.postForm.item = 'all'
                                this.axios[`update${this.type}Info`](this.postForm).then(res => {
                                    this.$notify({
                                        title: res.data.status ? '成功' : '失败',
                                        message: res.data.message,
                                        type: res.data.status ? 'success' : 'error'
                                    });
                                    if (res.data.status){
                                        setTimeout(() => {
                                            this.$router.push({
                                                path: 'list'
                                            });
                                        },500)
                                    }
                                })
                            }
                            else {
                                this.postForm.status = status
                                this.axios[`add${this.type}`](this.postForm).then(res => {
                                    this.postStatus = status === 4 ? 'published' : (status === 1 ? 'checking' : (status === 0 ? 'saved' : 'draft'))
                                    this.$notify({
                                        title: res.data.status ? '成功' : '失败',
                                        message: res.data.message,
                                        type: res.data.status ? 'success' : 'error'
                                    });
                                    if (res.data.status){
                                        setTimeout(() => {
                                            this.$router.push({
                                                path: 'list'
                                            });
                                        },500)
                                    }
                                }).catch((error) => {
                                    console.log('更新资料失败',error)
                                })
                            }

                        }
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        handleCoverConfirm(data){
            this.confirmBtnLoading = true
            this.upload(data, res => {
                this.confirmBtnLoading = false
                this.upDoneBool = true
                this.postForm.cover_url = res.result_url
            })
        },
        searchMusic(queryString, cb){
            if (!queryString) return
            this.axios.searchMusic(queryString).then((res) => {
                const result = res.data.xiami.songList.map((item) => {
                    return {
                        value: item.name,
                        musicInfo: {
                            file: item.file,
                            title: item.name,
                            cover: item.album.cover,
                            avatar: item.artists[0].avatar,
                            author: item.artists[0].name
                        }
                    }
                })
                cb(result)
            })
        },
        handleSelectMusic(item){
            console.log('eee', item)
            this.postForm.music_info = item.musicInfo
            window.mePlayer({
                music : {
                    src   : item.musicInfo.file,
                    title : item.musicInfo.title,
                    author: item.musicInfo.author,
                    cover : item.musicInfo.cover,
                    // lrc   : '歌词字符串：[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n ...'
                },
                target: '.player',
                autoplay: false // 是否自动播放
            });
        },
        // 上传文件到七牛云
        upqiniu (data) {
            if (!data.file) return
            if (!/mp3/.test(data.file.type)){
                this.$message({
                    message: '只能上传MP3文件，且不超过30MB',
                    type: 'info',
                })
                return;
            }
            else if (this.readFileSize(data.file).indexOf('MB') > -1 ) {
                if (parseInt(this.readFileSize(data.file)) > 30){
                    this.$message({
                        message: '只能上传MP3文件，且不超过30MB',
                        type: 'info',
                    })
                    return;
                }
                else {
                    this.axios.getUploadToken().then((res) => {
                        const token = res.data.upToken
                        const key = `moment${Date.now()}${Math.floor(Math.random() * 100)}.${data.file.type.split('/')[1]}`
                        const putExtra = {
                            fname: "",
                            params: {},
                            mimeType: null
                        };
                        const config = {
                            useCdnDomain: true,
                            region: qiniu.region.z0,
                        };
                        console.log(token)
                        const observable = qiniu.upload(data.file, key, token, putExtra, config)
                        this.showProgress = true
                        this.$notify({
                            title: '上传音频文件中',
                            message: '上传音频文件中，请稍等~',
                            type: 'info',
                            duration: 5000
                        });
                        const self = this
                        const subscription = observable.subscribe({
                            next(res){
                                // console.log('next res', res)
                                self.soundUploadPercent = Math.floor(res.total.percent)
                            },
                            error(err){
                                console.log('error err', err)
                                self.soundUploadStatus = 'exception'
                            },
                            complete(res){
                                // console.log('complete res', res)
                                self.soundUploadStatus = 'success'
                                self.postForm.sound_url = `http://p89inamdb.bkt.clouddn.com/${res.key}`
                                console.log(self.soundUrl)
                                window.mePlayer({
                                    music : {
                                        src   : self.postForm.sound_url,
                                        title : data.file.name,
                                        author: '未知',
                                        cover : `http://p89inamdb.bkt.clouddn.com/default_av.jpg`,
                                        // lrc   : '歌词字符串：[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n ...'
                                    },
                                    target: '.sound_play',
                                    autoplay: false // 是否自动播放
                                });
                            }
                        }) // 上传开始
                    }).catch(error => console.log(error))


                }
            }
        },
        beforeUpload(file) {

        },
        readFileSize(file){
            return (file.size / 1024).toFixed(4) > 1024 ?  (file.size / (1024 * 1024)).toFixed(4)+ 'MB' : (file.size / 1024).toFixed(4)+ 'KB';
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .sub-nav{
        width: 100%;
        height: 50px;
        padding: 10px 50px;
        overflow: hidden;
        .btn{
            float: right;
        }
    }
    .title-prompt{
        position: absolute;
        right: 0px;
        font-size: 12px;
        top:10px;
        color:#ff4949;
    }
    .createPost-container {
        position: relative;
        .createPost-main-container {
            padding: 40px 45px 20px 50px;
            .postInfo-container {
                position: relative;
                margin-bottom: 10px;
                .postInfo-container-item {
                    float: left;
                }
            }
            .editor-container {
                min-height: 300px;
                margin: 0 0 30px;
                .editor-upload-btn-container {
                    text-align: right;
                    margin-right: 10px;
                    .editor-upload-btn {
                        display: inline-block;
                    }
                }
            }
        }
        .word-counter {
            width: 40px;
            position: absolute;
            right: -10px;
            top: 0px;
        }

        .post-cover, .music-container, .sound-container{
            .dec{
                font-size: 14px;
                color: rgba(0,0,0,.7);
                padding: 10px 0;
            }
        }
        .music-container, .sound-container{
            margin-bottom: 30px;
        }
    }
    .show_player{
        margin: 10px auto;
    }
    .searchMusicInput{
        width: 100%;
    }
    .origin-music-text{
        text-align: center;
        margin-bottom: 30px;
        font-size: 14px;
        color: rgba(0,0,0,.7);
    }
    .origin-sound-text{
        text-align: center;
        margin-bottom: 30px;
        font-size: 14px;
        color: rgba(0,0,0,.7);
        margin-top: 20px;
    }
    .film-name{
        width: 300px;
    }
    /*.upload-sound{*/
        /*background-color: #fff;*/
        /*border: 1px dashed #d9d9d9;*/
        /*border-radius: 6px;*/
        /*box-sizing: border-box;*/
        /*width: 360px;*/
        /*height: 180px;*/
        /*text-align: center;*/
        /*cursor: pointer;*/
        /*position: relative;*/
        /*overflow: hidden;*/
        /*input[type='file'] {*/
            /*display: block;*/
            /*width: 100%;*/
            /*height: 100%;*/
            /*opacity: 0;*/
            /*position: absolute;*/
            /*top: 0;*/
            /*left: 0;*/
            /*cursor: pointer;*/
        /*}*/
        /*.el-icon-upload{*/
            /*font-size: 67px;*/
            /*color: #c0c4cc;*/
            /*margin: 40px 0 16px;*/
            /*line-height: 50px;*/
        /*}*/
        /*.el-upload__text{*/
            /*color: #606266;*/
            /*font-size: 14px;*/
            /*text-align: center;*/
            /*em{*/
                /*color: #409eff;*/
                /*font-style: normal;*/
            /*}*/
        /*}*/
        /*.el-upload__tip{*/
            /*font-size: 12px;*/
            /*color: #606266;*/
            /*margin-top: 7px;*/
        /*}*/
    /*}*/
</style>

