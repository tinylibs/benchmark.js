import { expectType } from "tsd";
import Benchmark from "../../types";

var suite = new Benchmark.Suite;

// add tests
suite
  .add('RegExp#test', function () {
    /o/.test('Hello World!');
  })
  .add('String#indexOf', function () {
    'Hello World!'.indexOf('o') > -1;
  })
  .add('String#match', function () {
    !!'Hello World!'.match(/o/);
  })
  // add listeners
  .on('cycle', function (event) {
    expectType<Benchmark.Event>(event);
  })
  .on('complete', function (this) {
    expectType<Benchmark.Suite>(this);
    expectType<(callback: string | Function) => Benchmark.Suite>(this.filter);
  })
  // run async
  .run({ 'async': true });

var fn = () => { };
var onStart = () => { };
var onCycle = () => { };
var onAbort = () => { };
var onError = () => { };
var onReset = () => { };
var onComplete = () => { };
var setup = () => { };
var teardown = () => { };
var benches: Benchmark[] = [new Benchmark(fn), new Benchmark(fn)];

// basic usage (the `new` operator is optional)
var bench = new Benchmark(fn);

// or using a name first
var bench = new Benchmark('foo', fn);

// or with options
var bench = new Benchmark('foo', fn, {

  // displayed by `Benchmark#toString` if `name` is not available
  'id': 'xyz',

  // called when the benchmark starts running
  'onStart': onStart,

  // called after each run cycle
  'onCycle': onCycle,

  // called when aborted
  'onAbort': onAbort,

  // called when a test errors
  'onError': onError,

  // called when reset
  'onReset': onReset,

  // called when the benchmark completes running
  'onComplete': onComplete,

  // compiled/called before the test loop
  'setup': setup,

  // compiled/called after the test loop
  'teardown': teardown
});

// or name and options
var bench = new Benchmark('foo', {

  // a flag to indicate the benchmark is deferred
  'defer': true,

  // benchmark test function
  'fn': function (deferred) {
    expectType<Benchmark.Deferred>(deferred);
    // call `Deferred#resolve` when the deferred test is finished
    deferred.resolve();
  }
});

// or options only
var bench = new Benchmark({

  // benchmark name
  'name': 'foo',

  // benchmark test as a string
  'fn': '[1,2,3,4].sort()'
});

// a test’s `this` binding is set to the benchmark instance
var bench = new Benchmark('foo', function () {
  expectType<Benchmark>(this);
});

// a test’s `this` binding is set to the benchmark instance
var bench = new Benchmark(function () {
  expectType<Benchmark>(this);
});

// get odd numbers
Benchmark.filter([1, 2, 3, 4, 5], function (n) {
  return n % 2;
}); // -> [1, 3, 5];

// get fastest benchmarks
Benchmark.filter(benches, 'fastest');

// get slowest benchmarks
Benchmark.filter(benches, 'slowest');

// get benchmarks that completed without erroring
Benchmark.filter(benches, 'successful');

// invoke `reset` on all benchmarks
Benchmark.invoke(benches, 'reset');

// invoke `emit` with arguments
Benchmark.invoke(benches, 'emit', 'complete', () => ({}));

// invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
Benchmark.invoke(benches, {

  // invoke the `run` method
  'name': 'run',

  // pass a single argument
  'args': true,

  // treat as queue, removing benchmarks from front of `benches` until empty
  'queued': true,

  // called before any benchmarks have been invoked.
  'onStart': onStart,

  // called between invoking benchmarks
  'onCycle': onCycle,

  // called after all benchmarks have been invoked.
  'onComplete': onComplete
});

// basic usage
var bench = new Benchmark({
  'setup': function () {
    expectType<Benchmark>(this);
  },
  'teardown': function () {
    expectType<Benchmark>(this);
  },
  'fn': function () {
  }
});

// or using strings
var bench = new Benchmark({
  'setup': '\
    var a = 0;\n\
    (function() {\n\
      (function() {\n\
        (function() {',
  'fn': 'a += 1;',
  'teardown': '\
         }())\n\
       }())\n\
     }())'
});

var bizarro = bench.clone({
  'name': 'doppelganger'
});

// unregister a listener for an event type
bench.off('cycle', function (event) {
  expectType<Benchmark>(this);
  expectType<Benchmark.Event>(event);
});

// unregister a listener for multiple event types
bench.off('start cycle', function (event) {
  expectType<Benchmark>(this);
  expectType<Benchmark.Event>(event);
});

// unregister all listeners for an event type
bench.off('cycle');

// unregister all listeners for multiple event types
bench.off('start cycle complete');

// unregister all listeners for all event types
bench.off();

// register a listener for an event type
bench.on('cycle', function (event) {
  expectType<Benchmark>(this);
  expectType<Benchmark.Event>(event);
});

// ensure target is correct type
bench.on('cycle', (event) => {
  expectType<Benchmark.Event>(event);
  const target = event.target;
  target.options;
  target.async;
  target.defer;
  target.delay;
  target.initCount;
  target.maxTime;
  target.minSamples;
  target.minTime;
  target.name;
  target.fn;
  target.id;
  target.stats;
  if (target.stats) {
    target.stats.moe;
    target.stats.rme;
    target.stats.sem;
    target.stats.deviation;
    target.stats.mean;
    target.stats.sample;
    target.stats.variance;
  }
  target.times;
  if (target.times) {
    target.times.cycle;
    target.times.elapsed;
    target.times.period;
    target.times.timeStamp;
  }
  target.running;
  target.count;
  target.compiled;
  target.cycles;
  target.hz;
});

// register a listener for multiple event types
bench.on('start cycle', function (event) {
  expectType<Benchmark>(this);
  expectType<Benchmark.Event>(event);
});

// basic usage
bench.run();

// or with options
bench.run({ 'async': true });

// basic usage
suite.add(fn);

// or using a name first
suite.add('foo', fn);

suite.add('async', async function () { });

suite.add('sync', function () {
  expectType<Benchmark.Suite>(this);
});

suite.add('sync', function (deferred) {
  expectType<Benchmark.Suite>(this);
  expectType<Benchmark.Deferred>(deferred);
});

// or with options
suite.add('foo', fn, {
  'onCycle': onCycle,
  'onComplete': onComplete
});

// or name and options
suite.add('foo', {
  'fn': fn,
  'onCycle': onCycle,
  'onComplete': onComplete
});

// or options only
suite.add({
  'name': 'foo',
  'fn': fn,
  'onCycle': onCycle,
  'onComplete': onComplete
});

// unregister a listener for an event type
suite.off('cycle', function (event) {
  expectType<Benchmark.Suite>(this);
  expectType<Benchmark.Event>(event);
});

// unregister a listener for multiple event types
suite.off('start cycle', function (event) {
  expectType<Benchmark.Suite>(this);
  expectType<Benchmark.Event>(event);
});

// unregister all listeners for an event type
expectType<Benchmark.Suite>(suite.off('cycle'));

// unregister all listeners for multiple event types
expectType<Benchmark.Suite>(suite.off('start cycle complete'));

// unregister all listeners for all event types
expectType<Benchmark.Suite>(suite.off());

// register a listener for an event type
suite.on('cycle', function (event) {
  expectType<Benchmark.Suite>(this);
  expectType<Benchmark.Event>(event);
});

// register a listener for multiple event types
suite.on('start cycle', function (event) {
  expectType<Benchmark.Suite>(this);
  expectType<Benchmark.Event>(event);
});

// basic usage
suite.run();

// or with options
suite.run({ 'async': true, 'queued': true });
