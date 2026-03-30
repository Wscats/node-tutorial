/**
 * FeHelper 正则工具
 */

/**
 * 自适应高度的jquery插件
 */
$.fn.extend({
    textareaAutoHeight:function (options) {
        this._options = {
            minHeight:0,
            maxHeight:100000
        };

        this.init = function () {
            for (var p in options) {
                this._options[p] = options[p];
            }
            if (this._options.minHeight === 0) {
                this._options.minHeight = parseFloat($(this).height());
            }
            for (var p in this._options) {
                if ($(this).attr(p) === null) {
                    $(this).attr(p, this._options[p]);
                }
            }
            $(this).keyup(this.resetHeight).change(this.resetHeight)
                .focus(this.resetHeight);
        };
        this.resetHeight = function () {
            const _minHeight = parseFloat($(this).attr("minHeight"));
            const _maxHeight = parseFloat($(this).attr("maxHeight"));

            $(this).height(0);
            let h = parseFloat(this.scrollHeight);
            h = h < _minHeight ? _minHeight :
                h > _maxHeight ? _maxHeight : h;
            $(this).height(h).scrollTop(h);
            if (h >= _maxHeight) {
                $(this).css("overflow-y", "scroll");
            }
            else {
                $(this).css("overflow-y", "hidden");
            }
        };
        this.init();
    }
});

const RegExpTools = (function () {

    "use strict";

    var regElm, srcElm, rstElm, rstCount, srcBackgroundElm, srcWrapperElm, regListElm;
    const ID_PREFIX = 'tmp_id_';
    const TAG_MATCHED = 'b';
    const TAG_NOT_MATCHED = 'i';
    const TR_ID_PREFIX = 'tr_' + ID_PREFIX;

    const _getRegExp = function (regTxt) {
        try {
            return new Function('return ' + regTxt)();
        } catch (e) {
            return null;
        }
    };

    const _buildTable = function (rstArray) {
        let tbl = ["<table class='table table-bordered table-striped table-condensed table-hover'>"];
        tbl.push('<tr class="active"><th class="num">序号</th><th>匹配结果</th><th>在原字符串中的位置</th></tr>')
        $.each(rstArray, function (i, item) {
            tbl.push('<tr id="' + TR_ID_PREFIX + item.index + '" data-index="' + item.index + '">');
            tbl.push('<td class="num">' + (i + 1) + '</td>'
                + '<td class="content">' + item.text + '</td>'
                + '<td class="index">' + item.index + '</td>');
            tbl.push('</tr>');
        });
        tbl.push('</table>');
        return tbl.join('');
    };

    const _createTag = function (type, item) {
        let tags = [];
        for (let i = 0, len = item.text.length; i < len; i++) {
            tags.push('<' + type + ' data-id="' + ID_PREFIX + item.index + '">'
                + item.text.charAt(i) + '</' + type + '>');
        }
        return tags.join('');
    };

    const _blinkHighlight = function () {
        $('tr[id^=' + TR_ID_PREFIX + ']').click(function (e) {
            const index = $(this).attr('data-index');
            const tags = $(TAG_MATCHED + '[data-id=' + ID_PREFIX + index + ']');
            tags.animate({
                opacity:0
            }, 200).delay().animate({
                    opacity:1
                }, 200).delay().animate({
                    opacity:0
                }, 200).delay().animate({
                    opacity:1
                }, 200);
        });
    };

    const _highlight = function (srcText, rstArray) {
        if (!srcText) {
            srcBackgroundElm.html('');
            return;
        }
        const hl = [];
        let preIndex = 0;
        $.each(rstArray, function (i, item) {
            if (i === 0) {
                if (item.index === 0) {
                    hl.push(_createTag(TAG_MATCHED, item));
                } else {
                    hl.push(_createTag(TAG_NOT_MATCHED, {
                        index:0,
                        text:srcText.substring(0, item.index)
                    }));
                    hl.push(_createTag(TAG_MATCHED, item));
                }
            } else {
                preIndex = rstArray[i - 1].index + rstArray[i - 1].text.length;
                hl.push(_createTag(TAG_NOT_MATCHED, {
                    index:preIndex,
                    text:srcText.substring(preIndex, item.index)
                }));
                hl.push(_createTag(TAG_MATCHED, item));
            }
        });
        srcBackgroundElm.html(hl.join(''));
        _blinkHighlight();
    };

    const _emptyTable = function (message) {
        const tbl = ["<table class='table table-bordered table-striped table-condensed table-hover'>"];
        tbl.push('<tr class="active"><th class="num">序号</th><th>匹配结果</th></tr>');
        tbl.push('<tr><td colspan="2">' + message + '</td></tr>');
        tbl.push('</table>');
        return tbl.join('');
    };

    const _dealRegMatch = function (e) {
        srcWrapperElm.height(srcElm.height() + 24);

        const regTxt = regElm.val().trim();
        const srcTxt = srcElm.val().trim();
        if (!regTxt || !srcTxt) {
            rstElm.html(_emptyTable('不能匹配'));
            rstCount.html('0个');
            _highlight();
        } else {
            let reg = _getRegExp(regTxt);
            if (!reg || !reg instanceof RegExp) {
                rstElm.html(_emptyTable('正则表达式错误！'));
                rstCount.html('0个');
                _highlight();
                return;
            }
            const rst = [];
            // 用字符串的replace方法来找到匹配目标在元字符串中的准确位置
            srcTxt.replace(reg, function () {
                const matchedTxt = arguments[0];
                const txtIndex = arguments[arguments.length - 2];
                rst.push({
                    text:matchedTxt,
                    index:txtIndex
                });
            });
            if (!rst || !rst.length) {
                rstElm.html(_emptyTable('不能匹配'));
                rstCount.html('0个');
                _highlight();
            } else {
                rstElm.html(_buildTable(rst));
                rstCount.html(rst.length + '个');
                _highlight(srcElm.val(), rst);
            }
        }
    };

    const _init = function () {
        $(function () {
            regElm = $('#regText');
            srcElm = $('#srcCode');
            srcBackgroundElm = $('#srcBackground');
            srcWrapperElm = $('#srcWrapper');
            rstElm = $('#rstCode').html(_emptyTable('暂无输入'));
            rstCount = $('#rstCount');
            regListElm = $('#regList');

            // 输入框自适应高度
            regElm.textareaAutoHeight({minHeight:34});
            srcElm.textareaAutoHeight({minHeight:50});
            srcBackgroundElm.textareaAutoHeight({minHeight:50});

            // 监听两个输入框的按键、paste、change事件
            $('#regText,#srcCode').keyup(_dealRegMatch).change(_dealRegMatch)
                .bind('paste', _dealRegMatch);

            regListElm.change(function (e) {
                const reg = $(this).val();
                const regTipElm = $('#regTip');
                regElm.val(reg);
                if (!reg) {
                    regTipElm.hide();
                } else {
                    regTipElm.show();
                }
            });
        });
    };

    return {
        init:_init
    };
})();

RegExpTools.init();