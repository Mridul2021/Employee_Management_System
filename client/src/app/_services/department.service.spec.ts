import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DepartmentService } from './department.service';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService],
    });
    service = TestBed.inject(DepartmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all departments', () => {
    const mockDepartments = [
      { name: 'HR', description: 'Human Resources', createdDate: '2024-12-01T00:00:00' },
      { name: 'IT', description: 'Information Technology', createdDate: '2024-12-02T00:00:00' },
    ];

    service.getAllDepartments().subscribe((departments) => {
      expect(departments.length).toBe(2);
      expect(departments).toEqual(mockDepartments);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/department/');
    expect(req.request.method).toBe('GET');
    req.flush(mockDepartments);
  });

  it('should create a new department', () => {
    const newDepartment = {
      name: 'Finance',
      description: 'Finance Department',
      createdDate: '2024-12-03T00:00:00',
    };

    service.createDepartment(newDepartment).subscribe((response) => {
      expect(response).toEqual(newDepartment);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/department/');
    expect(req.request.method).toBe('POST');
    req.flush(newDepartment);
  });
});
