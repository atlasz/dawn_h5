/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.chat = (function() {

    /**
     * Namespace chat.
     * @exports chat
     * @namespace
     */
    var chat = {};

    chat.ChatInfo = (function() {

        /**
         * Properties of a ChatInfo.
         * @typedef chat.ChatInfo$Properties
         * @type {Object}
         * @property {string} [playerName] ChatInfo playerName.
         */

        /**
         * Constructs a new ChatInfo.
         * @exports chat.ChatInfo
         * @constructor
         * @param {chat.ChatInfo$Properties=} [properties] Properties to set
         */
        function ChatInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChatInfo playerName.
         * @type {string}
         */
        ChatInfo.prototype.playerName = "";

        /**
         * Creates a new ChatInfo instance using the specified properties.
         * @param {chat.ChatInfo$Properties=} [properties] Properties to set
         * @returns {chat.ChatInfo} ChatInfo instance
         */
        ChatInfo.create = function create(properties) {
            return new ChatInfo(properties);
        };

        /**
         * Encodes the specified ChatInfo message. Does not implicitly {@link chat.ChatInfo.verify|verify} messages.
         * @param {chat.ChatInfo$Properties} message ChatInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerName != null && message.hasOwnProperty("playerName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerName);
            return writer;
        };

        /**
         * Encodes the specified ChatInfo message, length delimited. Does not implicitly {@link chat.ChatInfo.verify|verify} messages.
         * @param {chat.ChatInfo$Properties} message ChatInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChatInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChatInfo message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chat.ChatInfo} ChatInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chat.ChatInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChatInfo message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chat.ChatInfo} ChatInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChatInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChatInfo message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        ChatInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerName != null && message.hasOwnProperty("playerName"))
                if (!$util.isString(message.playerName))
                    return "playerName: string expected";
            return null;
        };

        /**
         * Creates a ChatInfo message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {chat.ChatInfo} ChatInfo
         */
        ChatInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.chat.ChatInfo)
                return object;
            var message = new $root.chat.ChatInfo();
            if (object.playerName != null)
                message.playerName = String(object.playerName);
            return message;
        };

        /**
         * Creates a ChatInfo message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link chat.ChatInfo.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {chat.ChatInfo} ChatInfo
         */
        ChatInfo.from = ChatInfo.fromObject;

        /**
         * Creates a plain object from a ChatInfo message. Also converts values to other types if specified.
         * @param {chat.ChatInfo} message ChatInfo
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.playerName = "";
            if (message.playerName != null && message.hasOwnProperty("playerName"))
                object.playerName = message.playerName;
            return object;
        };

        /**
         * Creates a plain object from this ChatInfo message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChatInfo.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this ChatInfo to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        ChatInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChatInfo;
    })();

    return chat;
})();

module.exports = $root;
