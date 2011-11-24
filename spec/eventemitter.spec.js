describe('EventEmitter', function() {
  beforeEach(function(){
    constr = KadOH.core.EventEmitter;
  });

  it('should be defined and be a function', function() {
    expect(constr).toBeDefined();
    expect(constr).toBeFunction();
  });

  it('should be instanciable', function() {
    expect(typeof (new constr())).toEqual('object');
  });

  describe('when i add a listener', function() {
    beforeEach(function(){
      ee = new constr();

      spy = jasmine.createSpy();
      ee.on('foo', spy);
    });

    it('should be added to the event queue', function() {
      expect(typeof ee._events.foo).toBeDefined();
      var evt = ee._events.foo[ee._events.foo.length -1]; //last opushed one
      expect(evt.listener).toEqual(spy);
    });

    describe('and when I fire the associated event with arguments', function() {
      beforeEach(function() {
        ee.emit('foo', 'arg1', false);
      });

      it('should have been called with the right arguments', function() {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('arg1', false);
      });
    });

    it('should be removable', function() {
      ee.removeListener('foo', spy);
      ee.emit('foo');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when i add a one time listener and I fire the event 2 times', function() {
    beforeEach(function() {
      ee = new constr();
      spy = jasmine.createSpy();
      ee.once('foo', spy);

      ee.emit('foo').emit('foo');
    });

    it('the listener should have been called only one time', function() {
      expect(spy.callCount).toEqual(1);
    });
  });

  describe('when i add a listener specifying the scope and i fire the event', function() {
      beforeEach(function() {
      ee = new constr();

      spy = jasmine.createSpy();

      scope = {foo : 'pierrot'};
      ee.once('foo', spy, scope);

      ee.emit('foo');
    });

    it('should have bee called with the appropriate scope', function() {
      expect(spy.mostRecentCall.object).toEqual(scope); 
      //object refers to the inner scope when spy has been called : nice !
    });
  });
});