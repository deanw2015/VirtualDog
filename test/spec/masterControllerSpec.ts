/// <reference path="../../typings/index.d.ts" />
import vdog = dogsrus.virtdog;

describe("In the file masterController.ts", () => {
    describe("the masterController's", () => {
        let sut: vdog.MasterController,
            $rootScope: ng.IRootScopeService,
            $controller: ng.IControllerService,
            masterControllerParams: {
                $rootScope: ng.IRootScopeService,
                eventNames: vdog.EventNames
            };
        beforeEach(() => {
            angular.mock.module("app.people");
            inject(($injector: ng.auto.IInjectorService) => {
                $controller = $injector.get<ng.IControllerService>("$controller");
                $rootScope = $injector.get<ng.IRootScopeService>("$rootScope");
                masterControllerParams = {
                    $rootScope: $rootScope,
                    eventNames: vdog.eventNames
                };
            });
            sut = $controller<vdog.MasterController>("masterController", masterControllerParams);
        });

        describe("constructor", () => {
            it("should set familiarName to Dillon", () => {
                expect(sut.familiarName).toEqual("Dillon");
            });
            it("should set speciesName to 'Homo Sapiens'", () => {
                expect(sut.speciesName).toEqual("Homo Sapiens");
            });
            it("should add 2 items to the masterAtions", () => {
                expect(sut.masterActions.length).toEqual(2);
            });
            it("should set first item actionName in masterActions to 'Throw Object'", () => {
                expect(sut.masterActions[0].actionName).toEqual("Throw Object");
            });
            it("should set first item actionFunc in masterActions", () => {
                expect(sut.masterActions[0].actionFunc).toBeDefined("actionFunc is not defined for Throw Object");
                expect(sut.masterActions[0].actionFunc).not.toBeNull("actionFunc is null for Throw Object");
            });
            it("should set second item actionName in masterActions to 'Feed'", () => {
                expect(sut.masterActions[1].actionName).toEqual("Feed");
            });
            it("should set second item actionFunc in masterActions", () => {
                expect(sut.masterActions[1].actionFunc).toBeDefined("actionFunc is not defined for Feed");
                expect(sut.masterActions[1].actionFunc).not.toBeNull("actionFunc is null for Feed");
            });
            it("should add 6 items to the actions list", () => {
                expect(sut.masterObjects.length).toEqual(6);
            });
            it("should set masterObject item 1 to 'Babe Ruth autographed baseball'", () => {
                expect(sut.masterObjects[0].name).toEqual('Babe Ruth autographed baseball');
            });
            it("should set masterObject item 2 to 'ball'", () => {
                expect(sut.masterObjects[1].name).toEqual('ball');
            });
            it("should set masterObject item 3 to 'frisbee'", () => {
                expect(sut.masterObjects[2].name).toEqual('frisbee');
            });
            it("should set masterObject item 4 to 'stick'", () => {
                expect(sut.masterObjects[3].name).toEqual('stick');
            });
            it("should set masterObject item 5 to 'dog food'", () => {
                expect(sut.masterObjects[4].name).toEqual('dog food');
            });
            it("should set masterObject item 6 to 'table scraps'", () => {
                expect(sut.masterObjects[5].name).toEqual('table scraps');
            });
        });
        describe("broadcast related property", () => {
            let broadcastObject: vdog.DogObject;
            beforeEach(() => {
                broadcastObject = new vdog.DogObject("Foo", false, false);
                spyOn($rootScope, "$broadcast");
            });
            describe("throwSomething", () => {
                it("should broadcast the throw event name and the object thrown", () => {
                    sut.throwSomething(broadcastObject);
                    expect($rootScope.$broadcast).toHaveBeenCalledWith(
                        vdog.eventNames.masterThrow, broadcastObject
                    );
                });
            });

            describe("feedTheDog", () => {
                it("should broadcast the feed event name and the object fed", () => {
                    sut.feedTheDog(broadcastObject);
                    expect($rootScope.$broadcast).toHaveBeenCalledWith(
                        vdog.eventNames.masterFeed, broadcastObject
                    );
                });
            });
        });
        describe("feedTheDog, when $broadcast is being spied on", () => {
            let foodObject: vdog.DogObject;
            let wasBroadcast: boolean;
            beforeEach(() => {
                foodObject = new vdog.DogObject("Bar", false, false);
                wasBroadcast = false;

                spyOn($rootScope, "$broadcast");
                $rootScope.$on(vdog.eventNames.masterFeed, (event, args) => wasBroadcast = true);
            });
            describe("and there is no callThrough", () => {
                it("should not broadcast", () => {
                    sut.feedTheDog(foodObject);
                    expect($rootScope.$broadcast).toHaveBeenCalled();
                    expect(wasBroadcast).toBeFalsy;
                });
            });
            describe("and there is a callThrough", () => {
                it("should broadcast", () => {
                    (<jasmine.Spy>$rootScope.$broadcast).and.callThrough();
                    sut.feedTheDog(foodObject);
                    expect($rootScope.$broadcast).toHaveBeenCalled();
                    expect(wasBroadcast).toBeTruthy;
                });
            })
        });
    });
    describe("the MasterAction object's constructor", () => {
        let sut: vdog.MasterAction,
            actionFunc = (o: vdog.DogObject) => { };
        beforeEach(() => {
            sut = new vdog.MasterAction("masterActionName", actionFunc)
        });
        it("should set the actionName to the name passed in", () => {
            expect(sut.actionName).toEqual("masterActionName");
        });
        it("should set the actionFunc to the function passed in", () => {
            expect(sut.actionFunc).toBe(actionFunc, "actionFunc should match passed in action function");
        });
    });
});