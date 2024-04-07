const req = {
   _events: {
     close: undefined,
     error: undefined,
     data: undefined,
     end: undefined,
     readable: undefined,
     aborted: undefined
   },
   _readableState: ReadableState {
     highWaterMark: 16384,
     buffer: [],
     bufferIndex: 0,
     length: 0,
     pipes: [],
     awaitDrainWriters: null,
     [Symbol(kState)]: 60295036
   },
   _maxListeners: undefined,
   socket: <ref *1> Socket {
     connecting: false,
     _hadError: false,
     _parent: null,
     _host: null,
     _closeAfterHandlingError: false,
     _events: {
       close: [Array],
       error: [Function: socketOnError],
       prefinish: undefined,
       finish: undefined,
       drain: [Function: bound socketOnDrain],
       data: [Function: bound socketOnData],
       end: [Array],
       readable: undefined,
       timeout: [Function: socketOnTimeout],
       resume: [Function: onSocketResume],
       pause: [Function: onSocketPause]
     },
     _readableState: ReadableState {
       highWaterMark: 16384,
       buffer: [],
       bufferIndex: 0,
       length: 0,
       pipes: [],
       awaitDrainWriters: null,
       [Symbol(kState)]: 193997060
     },
     _writableState: WritableState {
       highWaterMark: 16384,
       length: 0,
       corked: 0,
       onwrite: [Function: bound onwrite],
       writelen: 0,
       bufferedIndex: 0,
       pendingcb: 0,
       [Symbol(kState)]: 17563908,
       [Symbol(kBufferedValue)]: null,
       [Symbol(kWriteCbValue)]: [Function (anonymous)],
       [Symbol(kAfterWriteTickInfoValue)]: null
     },
     allowHalfOpen: true,
     _maxListeners: undefined,
     _eventsCount: 8,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server: Server {
       maxHeaderSize: undefined,
       insecureHTTPParser: undefined,
       requestTimeout: 300000,
       headersTimeout: 60000,
       keepAliveTimeout: 5000,
       connectionsCheckingInterval: 30000,
       requireHostHeader: true,
       joinDuplicateHeaders: undefined,
       rejectNonStandardBodyWrites: false,
       _events: [Object: null prototype],
       _eventsCount: 3,
       _maxListeners: undefined,
       _connections: 2,
       _handle: [TCP],
       _usingWorkers: false,
       _workers: [],
       _unref: false,
       allowHalfOpen: true,
       pauseOnConnect: false,
       noDelay: true,
       keepAlive: false,
       keepAliveInitialDelay: 0,
       highWaterMark: 16384,
       httpAllowHalfOpen: false,
       timeout: 0,
       maxHeadersCount: null,
       maxRequestsPerSocket: 0,
       _connectionKey: '6::::4000',
       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
       [Symbol(ServerResponse)]: [Function: ServerResponse],
       [Symbol(shapeMode)]: false,
       [Symbol(kCapture)]: false,
       [Symbol(async_id_symbol)]: 645,
       [Symbol(kUniqueHeaders)]: null,
       [Symbol(http.server.connections)]: ConnectionsList {},
       [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
         _idleTimeout: 30000,
         _idlePrev: [TimersList],
         _idleNext: [TimersList],
         _idleStart: 612,
         _onTimeout: [Function: bound checkConnections],
         _timerArgs: undefined,
         _repeat: 30000,
         _destroyed: false,
         [Symbol(refed)]: false,
         [Symbol(kHasPrimitive)]: false,
         [Symbol(asyncId)]: 647,
         [Symbol(triggerId)]: 646
       }
     },
     _server: Server {
       maxHeaderSize: undefined,
       insecureHTTPParser: undefined,
       requestTimeout: 300000,
       headersTimeout: 60000,
       keepAliveTimeout: 5000,
       connectionsCheckingInterval: 30000,
       requireHostHeader: true,
       joinDuplicateHeaders: undefined,
       rejectNonStandardBodyWrites: false,
       _events: [Object: null prototype],
       _eventsCount: 3,
       _maxListeners: undefined,
       _connections: 2,
       _handle: [TCP],
       _usingWorkers: false,
       _workers: [],
       _unref: false,
       allowHalfOpen: true,
       pauseOnConnect: false,
       noDelay: true,
       keepAlive: false,
       keepAliveInitialDelay: 0,
       highWaterMark: 16384,
       httpAllowHalfOpen: false,
       timeout: 0,
       maxHeadersCount: null,
       maxRequestsPerSocket: 0,
       _connectionKey: '6::::4000',
       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
       [Symbol(ServerResponse)]: [Function: ServerResponse],
       [Symbol(shapeMode)]: false,
       [Symbol(kCapture)]: false,
       [Symbol(async_id_symbol)]: 645,
       [Symbol(kUniqueHeaders)]: null,
       [Symbol(http.server.connections)]: ConnectionsList {},
       [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
         _idleTimeout: 30000,
         _idlePrev: [TimersList],
         _idleNext: [TimersList],
         _idleStart: 612,
         _onTimeout: [Function: bound checkConnections],
         _timerArgs: undefined,
         _repeat: 30000,
         _destroyed: false,
         [Symbol(refed)]: false,
         [Symbol(kHasPrimitive)]: false,
         [Symbol(asyncId)]: 647,
         [Symbol(triggerId)]: 646
       }
     },
     parser: HTTPParser {
       '0': null,
       '1': [Function: parserOnHeaders],
       '2': [Function: parserOnHeadersComplete],
       '3': [Function: parserOnBody],
       '4': [Function: parserOnMessageComplete],
       '5': [Function: bound onParserExecute],
       '6': [Function: bound onParserTimeout],
       _headers: [],
       _url: '',
       socket: [Circular *1],
       incoming: [Circular *2],
       outgoing: null,
       maxHeaderPairs: 2000,
       _consumed: true,
       onIncoming: [Function: bound parserOnIncoming],
       joinDuplicateHeaders: null,
       [Symbol(resource_symbol)]: [HTTPServerAsyncResource]
     },
     on: [Function: socketListenerWrap],
     addListener: [Function: socketListenerWrap],
     prependListener: [Function: socketListenerWrap],
     setEncoding: [Function: socketSetEncoding],
     _paused: false,
     _httpMessage: ServerResponse {
       _events: [Object: null prototype],
       _eventsCount: 1,
       _maxListeners: undefined,
       outputData: [],
       outputSize: 0,
       writable: true,
       destroyed: false,
       _last: false,
       chunkedEncoding: false,
       shouldKeepAlive: true,
       maxRequestsOnConnectionReached: false,
       _defaultKeepAlive: true,
       useChunkedEncodingByDefault: true,
       sendDate: true,
       _removedConnection: false,
       _removedContLen: false,
       _removedTE: false,
       strictContentLength: false,
       _contentLength: null,
       _hasBody: true,
       _trailer: '',
       finished: false,
       _headerSent: false,
       _closed: false,
       socket: [Circular *1],
       _header: null,
       _keepAliveTimeout: 5000,
       _onPendingData: [Function: bound updateOutgoingData],
       req: [Circular *2],
       _sent100: false,
       _expect_continue: false,
       _maxRequestsPerSocket: 0,
       locals: [Object: null prototype] {},
       [Symbol(shapeMode)]: false,
       [Symbol(kCapture)]: false,
       [Symbol(kBytesWritten)]: 0,
       [Symbol(kNeedDrain)]: false,
       [Symbol(corked)]: 0,
       [Symbol(kOutHeaders)]: [Object: null prototype],
       [Symbol(errored)]: null,
       [Symbol(kHighWaterMark)]: 16384,
       [Symbol(kRejectNonStandardBodyWrites)]: false,
       [Symbol(kUniqueHeaders)]: null
     },
     timeout: 0,
     [Symbol(async_id_symbol)]: 650,
     [Symbol(kHandle)]: TCP {
       reading: true,
       onconnection: null,
       _consumed: true,
       [Symbol(owner_symbol)]: [Circular *1]
     },
     [Symbol(lastWriteQueueSize)]: 0,
     [Symbol(timeout)]: Timeout {
       _idleTimeout: -1,
       _idlePrev: null,
       _idleNext: null,
       _idleStart: 2919,
       _onTimeout: null,
       _timerArgs: undefined,
       _repeat: null,
       _destroyed: true,
       [Symbol(refed)]: false,
       [Symbol(kHasPrimitive)]: false,
       [Symbol(asyncId)]: 697,
       [Symbol(triggerId)]: 695
     },
     [Symbol(kBuffer)]: null,
     [Symbol(kBufferCb)]: null,
     [Symbol(kBufferGen)]: null,
     [Symbol(shapeMode)]: true,
     [Symbol(kCapture)]: false,
     [Symbol(kSetNoDelay)]: true,
     [Symbol(kSetKeepAlive)]: false,
     [Symbol(kSetKeepAliveInitialDelay)]: 0,
     [Symbol(kBytesRead)]: 0,
     [Symbol(kBytesWritten)]: 0
   },
   httpVersionMajor: 1,
   httpVersionMinor: 1,
   httpVersion: '1.1',
   complete: true,
   rawHeaders: [
     'Host',
     'localhost:4000',
     'Connection',
     'keep-alive',
     'Content-Length',
     '1915',
     'sec-ch-ua',
     '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
     'sec-ch-ua-platform',
     '"Windows"',
     'sec-ch-ua-mobile',
     '?0',
     'User-Agent',
     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
     'content-type',
     'application/json',
     'Accept',
     '*/*',
     'Origin',
     'http://localhost:4000',
     'Sec-Fetch-Site',
     'same-origin',
     'Sec-Fetch-Mode',
     'cors',
     'Sec-Fetch-Dest',
     'empty',
     'Referer',
     'http://localhost:4000/',
     'Accept-Encoding',
     'gzip, deflate, br, zstd',
     'Accept-Language',
     'en-US,en;q=0.9,la;q=0.8'
   ],
   rawTrailers: [],
   joinDuplicateHeaders: null,
   aborted: false,
   upgrade: false,
   url: '/',
   method: 'POST',
   statusCode: null,
   statusMessage: null,
   client: <ref *1> Socket {
     connecting: false,
     _hadError: false,
     _parent: null,
     _host: null,
     _closeAfterHandlingError: false,
     _events: {
       close: [Array],
       error: [Function: socketOnError],
       prefinish: undefined,
       finish: undefined,
       drain: [Function: bound socketOnDrain],
       data: [Function: bound socketOnData],
       end: [Array],
       readable: undefined,
       timeout: [Function: socketOnTimeout],
       resume: [Function: onSocketResume],
       pause: [Function: onSocketPause]
     },
     _readableState: ReadableState {
       highWaterMark: 16384,
       buffer: [],
       bufferIndex: 0,
       length: 0,
       pipes: [],
       awaitDrainWriters: null,
       [Symbol(kState)]: 193997060
     },
     _writableState: WritableState {
       highWaterMark: 16384,
       length: 0,
       corked: 0,
       onwrite: [Function: bound onwrite],
       writelen: 0,
       bufferedIndex: 0,
       pendingcb: 0,
       [Symbol(kState)]: 17563908,
       [Symbol(kBufferedValue)]: null,
       [Symbol(kWriteCbValue)]: [Function (anonymous)],
       [Symbol(kAfterWriteTickInfoValue)]: null
     },
     allowHalfOpen: true,
     _maxListeners: undefined,
     _eventsCount: 8,
     _sockname: null,
     _pendingData: null,
     _pendingEncoding: '',
     server: Server {
       maxHeaderSize: undefined,
       insecureHTTPParser: undefined,
       requestTimeout: 300000,
       headersTimeout: 60000,
       keepAliveTimeout: 5000,
       connectionsCheckingInterval: 30000,
       requireHostHeader: true,
       joinDuplicateHeaders: undefined,
       rejectNonStandardBodyWrites: false,
       _events: [Object: null prototype],
       _eventsCount: 3,
       _maxListeners: undefined,
       _connections: 2,
       _handle: [TCP],
       _usingWorkers: false,
       _workers: [],
       _unref: false,
       allowHalfOpen: true,
       pauseOnConnect: false,
       noDelay: true,
       keepAlive: false,
       keepAliveInitialDelay: 0,
       highWaterMark: 16384,
       httpAllowHalfOpen: false,
       timeout: 0,
       maxHeadersCount: null,
       maxRequestsPerSocket: 0,
       _connectionKey: '6::::4000',
       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
       [Symbol(ServerResponse)]: [Function: ServerResponse],
       [Symbol(shapeMode)]: false,
       [Symbol(kCapture)]: false,
       [Symbol(async_id_symbol)]: 645,
       [Symbol(kUniqueHeaders)]: null,
       [Symbol(http.server.connections)]: ConnectionsList {},
       [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
         _idleTimeout: 30000,
         _idlePrev: [TimersList],
         _idleNext: [TimersList],
         _idleStart: 612,
         _onTimeout: [Function: bound checkConnections],
         _timerArgs: undefined,
         _repeat: 30000,
         _destroyed: false,
         [Symbol(refed)]: false,
         [Symbol(kHasPrimitive)]: false,
         [Symbol(asyncId)]: 647,
         [Symbol(triggerId)]: 646
       }
     },
     _server: Server {
       maxHeaderSize: undefined,
       insecureHTTPParser: undefined,
       requestTimeout: 300000,
       headersTimeout: 60000,
       keepAliveTimeout: 5000,
       connectionsCheckingInterval: 30000,
       requireHostHeader: true,
       joinDuplicateHeaders: undefined,
       rejectNonStandardBodyWrites: false,
       _events: [Object: null prototype],
       _eventsCount: 3,
       _maxListeners: undefined,
       _connections: 2,
       _handle: [TCP],
       _usingWorkers: false,
       _workers: [],
       _unref: false,
       allowHalfOpen: true,
       pauseOnConnect: false,
       noDelay: true,
       keepAlive: false,
       keepAliveInitialDelay: 0,
       highWaterMark: 16384,
       httpAllowHalfOpen: false,
       timeout: 0,
       maxHeadersCount: null,
       maxRequestsPerSocket: 0,
       _connectionKey: '6::::4000',
       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
       [Symbol(ServerResponse)]: [Function: ServerResponse],
       [Symbol(shapeMode)]: false,
       [Symbol(kCapture)]: false,
       [Symbol(async_id_symbol)]: 645,
       [Symbol(kUniqueHeaders)]: null,
       [Symbol(http.server.connections)]: ConnectionsList {},
       [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
         _idleTimeout: 30000,
         _idlePrev: [TimersList],
         _idleNext: [TimersList],
         _idleStart: 612,
         _onTimeout: [Function: bound checkConnections],
         _timerArgs: undefined,
         _repeat: 30000,
         _destroyed: false,
         [Symbol(refed)]: false,
         [Symbol(kHasPrimitive)]: false,
         [Symbol(asyncId)]: 647,
         [Symbol(triggerId)]: 646
       }
     },
     parser: HTTPParser {
       '0': null,
       '1': [Function: parserOnHeaders],
       '2': [Function: parserOnHeadersComplete],
       '3': [Function: parserOnBody],
       '4': [Function: parserOnMessageComplete],
       '5': [Function: bound onParserExecute],
       '6': [Function: bound onParserTimeout],
       _headers: [],
       _url: '',
       socket: [Circular *1],
       incoming: [Circular *2],
       outgoing: null,
       maxHeaderPairs: 2000,
       _consumed: true,
       onIncoming: [Function: bound parserOnIncoming],
       joinDuplicateHeaders: null,
       [Symbol(resource_symbol)]: [HTTPServerAsyncResource]
     },
     on: [Function: socketListenerWrap],
     addListener: [Function: socketListenerWrap],
     prependListener: [Function: socketListenerWrap],
     setEncoding: [Function: socketSetEncoding],
     _paused: false,
     _httpMessage: ServerResponse {
       _events: [Object: null prototype],
       _eventsCount: 1,
       _maxListeners: undefined,
       outputData: [],
       outputSize: 0,
       writable: true,
       destroyed: false,
       _last: false,
       chunkedEncoding: false,
       shouldKeepAlive: true,
       maxRequestsOnConnectionReached: false,
       _defaultKeepAlive: true,
       useChunkedEncodingByDefault: true,
       sendDate: true,
       _removedConnection: false,
       _removedContLen: false,
       _removedTE: false,
       strictContentLength: false,
       _contentLength: null,
       _hasBody: true,
       _trailer: '',
       finished: false,
       _headerSent: false,
       _closed: false,
       socket: [Circular *1],
       _header: null,
       _keepAliveTimeout: 5000,
       _onPendingData: [Function: bound updateOutgoingData],
       req: [Circular *2],
       _sent100: false,
       _expect_continue: false,
       _maxRequestsPerSocket: 0,
       locals: [Object: null prototype] {},
       [Symbol(shapeMode)]: false,
       [Symbol(kCapture)]: false,
       [Symbol(kBytesWritten)]: 0,
       [Symbol(kNeedDrain)]: false,
       [Symbol(corked)]: 0,
       [Symbol(kOutHeaders)]: [Object: null prototype],
       [Symbol(errored)]: null,
       [Symbol(kHighWaterMark)]: 16384,
       [Symbol(kRejectNonStandardBodyWrites)]: false,
       [Symbol(kUniqueHeaders)]: null
     },
     timeout: 0,
     [Symbol(async_id_symbol)]: 650,
     [Symbol(kHandle)]: TCP {
       reading: true,
       onconnection: null,
       _consumed: true,
       [Symbol(owner_symbol)]: [Circular *1]
     },
     [Symbol(lastWriteQueueSize)]: 0,
     [Symbol(timeout)]: Timeout {
       _idleTimeout: -1,
       _idlePrev: null,
       _idleNext: null,
       _idleStart: 2919,
       _onTimeout: null,
       _timerArgs: undefined,
       _repeat: null,
       _destroyed: true,
       [Symbol(refed)]: false,
       [Symbol(kHasPrimitive)]: false,
       [Symbol(asyncId)]: 697,
       [Symbol(triggerId)]: 695
     },
     [Symbol(kBuffer)]: null,
     [Symbol(kBufferCb)]: null,
     [Symbol(kBufferGen)]: null,
     [Symbol(shapeMode)]: true,
     [Symbol(kCapture)]: false,
     [Symbol(kSetNoDelay)]: true,
     [Symbol(kSetKeepAlive)]: false,
     [Symbol(kSetKeepAliveInitialDelay)]: 0,
     [Symbol(kBytesRead)]: 0,
     [Symbol(kBytesWritten)]: 0
   },
   _consuming: true,
   _dumped: false,
   next: [Function: next],
   baseUrl: '',
   originalUrl: '/',
   _parsedUrl: Url {
     protocol: null,
     slashes: null,
     auth: null,
     host: null,
     port: null,
     hostname: null,
     hash: null,
     search: null,
     query: null,
     pathname: '/',
     path: '/',
     href: '/',
     _raw: '/'
   },
   params: {},
   query: {},
   res: <ref *3> ServerResponse {
     _events: [Object: null prototype] { finish: [Array] },
     _eventsCount: 1,
     _maxListeners: undefined,
     outputData: [],
     outputSize: 0,
     writable: true,
     destroyed: false,
     _last: false,
     chunkedEncoding: false,
     shouldKeepAlive: true,
     maxRequestsOnConnectionReached: false,
     _defaultKeepAlive: true,
     useChunkedEncodingByDefault: true,
     sendDate: true,
     _removedConnection: false,
     _removedContLen: false,
     _removedTE: false,
     strictContentLength: false,
     _contentLength: null,
     _hasBody: true,
     _trailer: '',
     finished: false,
     _headerSent: false,
     _closed: false,
     socket: <ref *1> Socket {
       connecting: false,
       _hadError: false,
       _parent: null,
       _host: null,
       _closeAfterHandlingError: false,
       _events: [Object],
       _readableState: [ReadableState],
       _writableState: [WritableState],
       allowHalfOpen: true,
       _maxListeners: undefined,
       _eventsCount: 8,
       _sockname: null,
       _pendingData: null,
       _pendingEncoding: '',
       server: [Server],
       _server: [Server],
       parser: [HTTPParser],
       on: [Function: socketListenerWrap],
       addListener: [Function: socketListenerWrap],
       prependListener: [Function: socketListenerWrap],
       setEncoding: [Function: socketSetEncoding],
       _paused: false,
       _httpMessage: [Circular *3],
       timeout: 0,
       [Symbol(async_id_symbol)]: 650,
       [Symbol(kHandle)]: [TCP],
       [Symbol(lastWriteQueueSize)]: 0,
       [Symbol(timeout)]: Timeout {
         _idleTimeout: -1,
         _idlePrev: null,
         _idleNext: null,
         _idleStart: 2919,
         _onTimeout: null,
         _timerArgs: undefined,
         _repeat: null,
         _destroyed: true,
         [Symbol(refed)]: false,
         [Symbol(kHasPrimitive)]: false,
         [Symbol(asyncId)]: 697,
         [Symbol(triggerId)]: 695
       },
       [Symbol(kBuffer)]: null,
       [Symbol(kBufferCb)]: null,
       [Symbol(kBufferGen)]: null,
       [Symbol(shapeMode)]: true,
       [Symbol(kCapture)]: false,
       [Symbol(kSetNoDelay)]: true,
       [Symbol(kSetKeepAlive)]: false,
       [Symbol(kSetKeepAliveInitialDelay)]: 0,
       [Symbol(kBytesRead)]: 0,
       [Symbol(kBytesWritten)]: 0
     },
     _header: null,
     _keepAliveTimeout: 5000,
     _onPendingData: [Function: bound updateOutgoingData],
     req: [Circular *2],
     _sent100: false,
     _expect_continue: false,
     _maxRequestsPerSocket: 0,
     locals: [Object: null prototype] {},
     [Symbol(shapeMode)]: false,
     [Symbol(kCapture)]: false,
     [Symbol(kBytesWritten)]: 0,
     [Symbol(kNeedDrain)]: false,
     [Symbol(corked)]: 0,
     [Symbol(kOutHeaders)]: [Object: null prototype] {
       'x-powered-by': [Array],
       vary: [Array],
       'access-control-allow-credentials': [Array]
     },
     [Symbol(errored)]: null,
     [Symbol(kHighWaterMark)]: 16384,
     [Symbol(kRejectNonStandardBodyWrites)]: false,
     [Symbol(kUniqueHeaders)]: null
   },
   body: {
     query: '\n' +
       '    query IntrospectionQuery {\n' +
       '      __schema {\n' +
       '        \n' +
       '        queryType { name }\n' +
       '        mutationType { name }\n' +
       '        subscriptionType { name }\n' +
       '        types {\n' +
       '          ...FullType\n' +
       '        }\n' +
       '        directives {\n' +
       '          name\n' +
       '          description\n' +
       '          \n' +
       '          locations\n' +
       '          args(includeDeprecated: true) {\n' +
       '            ...InputValue\n' +
       '          }\n' +
       '        }\n' +
       '      }\n' +
       '    }\n' +
       '\n' +
       '    fragment FullType on __Type {\n' +
       '      kind\n' +
       '      name\n' +
       '      description\n' +
       '      \n' +
       '      fields(includeDeprecated: true) {\n' +
       '        name\n' +
       '        description\n' +
       '        args(includeDeprecated: true) {\n' +
       '          ...InputValue\n' +
       '        }\n' +
       '        type {\n' +
       '          ...TypeRef\n' +
       '        }\n' +
       '        isDeprecated\n' +
       '        deprecationReason\n' +
       '      }\n' +
       '      inputFields(includeDeprecated: true) {\n' +
       '        ...InputValue\n' +
       '      }\n' +
       '      interfaces {\n' +
       '        ...TypeRef\n' +
       '      }\n' +
       '      enumValues(includeDeprecated: true) {\n' +
       '        name\n' +
       '        description\n' +
       '        isDeprecated\n' +
       '        deprecationReason\n' +
       '      }\n' +
       '      possibleTypes {\n' +
       '        ...TypeRef\n' +
       '      }\n' +
       '    }\n' +
       '\n' +
       '    fragment InputValue on __InputValue {\n' +
       '      name\n' +
       '      description\n' +
       '      type { ...TypeRef }\n' +
       '      defaultValue\n' +
       '      isDeprecated\n' +
       '      deprecationReason\n' +
       '    }\n' +
       '\n' +
       '    fragment TypeRef on __Type {\n' +
       '      kind\n' +
       '      name\n' +
       '      ofType {\n' +
       '        kind\n' +
       '        name\n' +
       '        ofType {\n' +
       '          kind\n' +
       '          name\n' +
       '          ofType {\n' +
       '            kind\n' +
       '            name\n' +
       '            ofType {\n' +
       '              kind\n' +
       '              name\n' +
       '              ofType {\n' +
       '                kind\n' +
       '                name\n' +
       '                ofType {\n' +
       '                  kind\n' +
       '                  name\n' +
       '                  ofType {\n' +
       '                    kind\n' +
       '                    name\n' +
       '                  }\n' +
       '                }\n' +
       '              }\n' +
       '            }\n' +
       '          }\n' +
       '        }\n' +
       '      }\n' +
       '    }\n' +
       '  ',
     operationName: 'IntrospectionQuery'
   },
   _body: true,
   length: undefined,
   _eventsCount: 0,
   [Symbol(shapeMode)]: true,
   [Symbol(kCapture)]: false,
   [Symbol(kHeaders)]: {
     host: 'localhost:4000',
     connection: 'keep-alive',
     'content-length': '1915',
     'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
     'sec-ch-ua-platform': '"Windows"',
     'sec-ch-ua-mobile': '?0',
     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
     'content-type': 'application/json',
     accept: '*/*',
     origin: 'http://localhost:4000',
     'sec-fetch-site': 'same-origin',
     'sec-fetch-mode': 'cors',
     'sec-fetch-dest': 'empty',
     referer: 'http://localhost:4000/',
     'accept-encoding': 'gzip, deflate, br, zstd',
     'accept-language': 'en-US,en;q=0.9,la;q=0.8'
   },
   [Symbol(kHeadersCount)]: 32,
   [Symbol(kTrailers)]: null,
   [Symbol(kTrailersCount)]: 0